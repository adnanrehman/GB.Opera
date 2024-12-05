import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown"; 
import { Calendar, CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { MFundCompanies, MFundPrices, MFunds, OfficialIndicsService } from '@proxy/officials-indics';
import { PermissionService } from '@abp/ng.core';
import { PriceAndIndices_FundPrices } from 'src/app/services/permissions';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FundPriceService } from '@proxy/fund-prices';
import { FundPrices } from '@proxy';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TreeModule } from 'primeng/tree';
import { CommonService } from '@proxy/commons';
import { DialogModule } from 'primeng/dialog';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-fund-prices',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    DialogModule,
    FileUploadModule,
    CheckboxModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
    TabViewModule, TreeModule
  ],
  templateUrl: './fund-prices.component.html',
  styleUrl: './fund-prices.component.scss'
})
export class FundPricesComponent {
  loading:boolean = false;
  selectedItem: any;
  clickedIndex = 0;
  showImportPriceModal: boolean = false;
  suggestions: any[] = [];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  markets:MFundCompanies[] = [];
  funds:MFunds[] = [];
  mFundPricesImportDto: any[]=[];
  fundPrices: MFundPrices[];
  fundPrice : MFundPrices = {
    mFundPriceID: 0,
    mFundID: 0,
    closingPrice: 0,
    tradingVolume: 0,
    lastClosePrice: 0,
    isActive: false
  }
  fundID: number = 0;
  companyID: number = 0;
  
  constructor( private officialIndicsService : OfficialIndicsService,
    private commonService: CommonService,
    private fundPriceService: FundPriceService,
    private permissionService: PermissionService) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   }

  ngOnInit() { 
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(PriceAndIndices_FundPrices + '.Delete')) {
      this.permission.delete = true;
    }
    this.getMFundCompanies();
     
  }

  search(event: AutoCompleteCompleteEvent) {
    this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
      this.loading = false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading = true;
    debugger;
    this.companyID = event.value.companyID;
    this.usp_getAllFunds();
    this.loading = false;
  }


  getMFundCompanies() {
    debugger;
    this.loading =true;
    this.officialIndicsService.getMFundCompanies().subscribe(res => {
      this.markets = res;
      if(this.markets.length > 0){
        this.companyID = this.markets[0].companyID;
        this.usp_getAllFunds();
      }else{
        this.loading =false;
      }
    });
  }

  usp_getAllFunds() {
    this.loading =true;
    this.officialIndicsService.getAllFundsByCompanyID(this.companyID).subscribe(res => {
      this.funds = res;
      if(this.funds.length > 0){
        this.fundID = this.funds[0].mFundID;
        this.usp_getAllFundPrices();
      }else{
        this.loading =false;
      }
    });
  }

  usp_getAllFundPrices() {
    this.loading =true;
    this.officialIndicsService.getAllFundPricesByMFundID(this.fundID).subscribe(res => {
      this.fundPrices = res;
      if(this.fundPrices.length > 0) this.handleFundPrice(this.fundPrices[0])
        else
      this.loading =false;
    });
  }

  handleFundPrice(fundPrice: MFundPrices) {
    this.fundPrice = fundPrice;
    if(this.fundPrice.priceDate)
      this.fundPrice.priceDate = moment(this.fundPrice.priceDate).format("MM/DD/YYYY")
    this.loading = false;
  }

  addNewFundPrice() {
    this.fundPrice = {
      mFundPriceID: 0,
      mFundID: 0,
      closingPrice: 0,
      tradingVolume: 0,
      lastClosePrice: 0,
      isActive: false
    };
  }

  insertMFundPrice() {
    debugger;
    this.loading = true;
    
    if(!this.fundID || this.fundID == 0){
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Error!', text: 'please select fund', icon: 'error', });
      this.loading = false;
    }else if(!this.fundPrice.priceDate){
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Error!', text: 'please select Date', icon: 'error', });
      this.loading = false;
    }
    else{
      this.fundPrice.mFundID = this.fundID;
      this.fundPrice.priceDate = moment(this.fundPrice.priceDate).format();
      this.fundPriceService.insertMFundPricesByModel(this.fundPrice).subscribe(res => {
        debugger;
        if (this.fundPrice.mFundPriceID > 0) {
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.fundPrice.closingPrice + ' updated successfully', icon: 'success', });
          this.addNewFundPrice();
        }
        else {
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.fundPrice.closingPrice + ' created successfully', icon: 'success', });
          this.addNewFundPrice();
        }
  
        this.loading = false;
      },
        error => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        });
    }
      

  }

  showImportModel(){
    this.showImportPriceModal =true;
  }

  onFileChange(event: any) {

    if (event.files.length === 0) {
      alert('No file selected.');
      return;
    }

    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];


              // Convert the worksheet to JSON with the first row as headers
              const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

              // Log jsonData to inspect the structure
              console.log('jsonData:', jsonData);
      
              // Ensure headers is of type string[] (array of strings)
              const headers: string[] = Array.isArray(jsonData[0]) ? jsonData[0] : [];
              console.log('headers:', headers);
      
              // Check if headers is empty or not in the expected format
              if (headers.length === 0) {
                  alert('Invalid or missing headers.');
                  return;
              }
      
              // Check if there is any data
              if (jsonData.length <= 1) {
                  console.error('No data found in the sheet.');
                  return;
              }
 

         debugger;     
      const formattedData = jsonData.slice(1).map((row: any) => {
        if(row[headers.indexOf('Ticker')] != undefined && row[headers.indexOf('ShortName')] != undefined){
          const ticker = row[headers.indexOf('Ticker')].toString();
          const mFund = row[headers.indexOf('ShortName')].toString();
          const date = row[headers.indexOf('PriceDate')];
          let priceDate: Date;
  
          if (typeof date === 'number') {
            const dateCode = XLSX.SSF.parse_date_code(date);
            priceDate = new Date(Date.UTC(dateCode.y, dateCode.m - 1, dateCode.d));
  
            const year = priceDate.getFullYear();
            const month = String(priceDate.getMonth() + 1).padStart(2, '0');
            const day = String(priceDate.getDate()).padStart(2, '0');
  
            const dates = `${year}-${month}-${day}`;
          } else if (typeof date === 'string') {
  
            priceDate = new Date(date);
          } else {
            priceDate = null;
          }
           
          const closingPrice = parseFloat(row[headers.indexOf('Price')]);  
          const tradingVolume = parseFloat(row[headers.indexOf('Volume')]);      

          return {
            ticker,
            mFund,
            priceDate,
            closingPrice,
            tradingVolume,
          };
        }

      });

       this.importData(formattedData);
    };

    reader.readAsBinaryString(file);

  }

  importData(data: any) {

    this.loading = true;
    this.mFundPricesImportDto = [];
    if (!Array.isArray(data)) {
      console.error('Data passed to importCurrencyData is not an array:', data);
      return;
    }

    if (!Array.isArray(this.mFundPricesImportDto)) {
      console.error('Date is not an array. Initializing as an empty array.');
      this.mFundPricesImportDto = [];
    }

    this.mFundPricesImportDto = [...this.mFundPricesImportDto, ...data];
    this.loading = false;
  }

  ImportFundPrices() {
    // Check if the currencies list is empty or not defined
    if (!this.mFundPricesImportDto || this.mFundPricesImportDto.length === 0) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        title: 'Error!',
        text: 'No Data to save.',
        icon: 'error',
      });
      return;  // Prevent further execution
    }

    this.loading = true; // Show loading spinner
debugger;
    this.fundPriceService.importMFundPricesByList(this.mFundPricesImportDto).subscribe(
      res => {
        if(res == "1"){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Success!',
            text: 'Saved successfully',
            icon: 'success',
          });
        }else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            title: 'Error!',
            text: res,
            icon: 'error',
          });
        }
         this.usp_getAllFundPrices();
        this.showImportPriceModal=false;
        // If you need to perform further actions, uncomment and use them:
        // this.addNewCountryGroup();
      },
      error => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          title: 'Error!',
          text: 'Failed to save data',
          icon: 'error',
        });
      },
      () => {
        this.loading = false; // Hide loading spinner when the request completes
      }
    );
  }

}

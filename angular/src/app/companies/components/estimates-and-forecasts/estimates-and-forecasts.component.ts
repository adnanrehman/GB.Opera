import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { EstimatesandForecastDto, EstimatesandForecastService } from '@proxy/estimatesand-forecasts';
import { CommonService } from '@proxy/commons';
import { CorporateAnnouncementDto } from '@proxy/corporate-announcements';
import Swal from 'sweetalert2';
import { PermissionService } from '@abp/ng.core';
import { Company_EstimatesAndForecasts } from 'src/app/services/permissions';

@Component({
  selector: 'app-estimates-and-forecasts',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TabViewModule,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ImageModule,
    FileUploadModule,
    NgFor,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
  ],
  templateUrl: './estimates-and-forecasts.component.html',
  styleUrl: './estimates-and-forecasts.component.scss'
})
export class EstimatesAndForecastsComponent {
  loading: boolean = false;
  autocomplete: boolean = false;
  headerValue: any;
  selectedItem: any;
  clickedIndex = 0;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number = 0;
  lastcompanyID: number = this.companyID;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  periodTypes = [];
  qPeriods = [];
  estimatesandForecasts = [];
  reportSources = [];
  estimatesandForecastActivation!: number;
  estimatesandForecast: EstimatesandForecastDto = {
    efid: 0,
    companyID: 0,
    year: 0,
    reportSourceID: 0
  };

  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private commonService: CommonService,
    private estimatesandForecastService: EstimatesandForecastService, private permissionService: PermissionService
  ) {
    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }

  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Company_EstimatesAndForecasts + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_EstimatesAndForecasts + '.edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Company_EstimatesAndForecasts + '.delete')) {
      this.permission.delete = true;
    }
    this.getStockMarkets();
    // this.stockMarketID = 0;
  }

  search(event: AutoCompleteCompleteEvent) {
  //  this.loading = true;
    this.commonService.searchCompaniesByParam(event.query).subscribe(res => {
      this.suggestions = res;
    //  this.loading = false;
    });
  }

  onSelect(event: any) {
    debugger;
    this.loading = true;
    debugger;
    this.stockMarketID = event.value.stockMarketID;
    this.sectorID = event.value.sectorID;
    this.companyID = event.value.companyID;
    this.lastcompanyID = this.companyID;
    this.autocomplete = true;
    this.getStockMarketSectorsByStockMarketID();
    this.selectedItem = null;
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if (this.stockMarkets.length > 0) this.stockMarketID = this.stockMarkets[0].stockMarketID; this.getStockMarketSectorsByStockMarketID();
    });
  }

  getStockMarketSectorsByStockMarketID() {
    debugger;
    this.resetAllModels();
    if(!this.autocomplete)
      this.sectorID = undefined;
    this.loading = true;
    this.commonService.getStockMarketSectorsByStockMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res;
      if (this.companyMarketSectors.length > 0){
        if(!this.sectorID)
        this.sectorID = this.companyMarketSectors[0].sectorID;
        this.getSectorCompaniesBySectorIDAndStockMarketID();
        this.autocomplete = false;
      } 
      else this.loading = false;
    });
  }
  onListBoxSelectionChange(event: any) {
    if(this.companyID == null)
      this.companyID = this.lastcompanyID;
    else
    this.lastcompanyID = this.companyID;
  }

  getSectorCompaniesBySectorIDAndStockMarketID() {
    debugger;
    if(!this.autocomplete)
      this.companyID = undefined;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getCompaniesForQNPBySectorIDAndMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res.companies;
        this.periodTypes = res.periodTypes;
        this.qPeriods = res.qPeriods;
        if (this.companiesTickers.length > 0) {
          if(!this.companyID)
          this.companyID = this.companiesTickers[0].companyID;
          this.getEstimatesandForecastsByCompanyID();
        }
        else this.loading = false;
      });
  }

  getEstimatesandForecastsByCompanyID() {
    debugger;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.estimatesandForecastService
      .getEstimatesandForecastsByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.estimatesandForecasts = res.estimatesandForecasts;
        this.reportSources = res.reportSources;
        if (this.estimatesandForecasts.length > 0) {
          this.handleEstimatesandForecast(this.estimatesandForecasts[0]);
        } else {
          this.loading = false;
          this.estimatesandForecast = {
            efid: 0,
            companyID: 0,
            year: 0,
            reportSourceID: 0
          };
        }
      });
  }

  resetAllModels (){
    this.companyMarketSectors = [];
    this.companiesTickers = [];
    this.estimatesandForecasts = [];
    this.reportSources = [];
    this.estimatesandForecast = {
      efid: 0,
      companyID: 0,
      year: 0,
      reportSourceID: 0
    };
  }

  handleEstimatesandForecast(estimatesandForecast: EstimatesandForecastDto) {
    this.estimatesandForecast = estimatesandForecast;
    this.loading = false;
  }


  addNewEstimatesandForecast() {
    this.estimatesandForecast = {
      efid: 0,
      companyID: 0,
      year: 0,
      reportSourceID: 0
    };
  }

  createOrUpdateEstimatesandForecast() {
    debugger;
    this.loading = true;
    this.estimatesandForecast.companyID = this.companyID;
    this.estimatesandForecast.year = Number(this.estimatesandForecast.year);
    this.estimatesandForecast.asofDate = new Date(this.estimatesandForecast.asofDate).toLocaleString();
    this.estimatesandForecast.reportDate = new Date(this.estimatesandForecast.reportDate).toLocaleString();
    this.estimatesandForecastService.createOrUpdateEstimatesandForecastByModel(this.estimatesandForecast).subscribe(res => {
      debugger;
      if (this.estimatesandForecast.efid > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.estimatesandForecast.remarks + ' updated successfully', icon: 'success', });
        this.getEstimatesandForecastsByCompanyID();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.estimatesandForecast.remarks + ' created successfully', icon: 'success', });
        this.getEstimatesandForecastsByCompanyID();
      }
      this.handleEstimatesandForecast(this.estimatesandForecast);

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

import { PermissionService } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryDto } from '@proxy/commons';
import { BankDto, BrokerDto, CountryInfoDto, CountryService, EconomicIndicatorDto, EconomicIndicatorTypeDto, ValueDeterminationDto } from '@proxy/countries';
import { CountryGroupDto } from '@proxy/country-groups';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { CompanyAndMarket_Country } from 'src/app/services/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-countries',
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
      FileUploadModule,
      CheckboxModule,
      ThemeSharedModule,
      ReactiveFormsModule,
      ListboxModule,
      InputTextModule,
      TabViewModule, TreeModule
    ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {

  loading: boolean = false;
  countryID = 0;
  // clickedIndex = 0;
  countryInfos: CountryInfoDto[]=[];
  countryGroups:CountryGroupDto[]=[];
  countries:CountryDto[]=[];
  banks:BankDto[]=[];
  brokers:BrokerDto[]=[];
  economicIndicators:EconomicIndicatorDto[] = [];
  economicIndicatorTypes:EconomicIndicatorTypeDto[] = [];
  valueDeterminations:ValueDeterminationDto[] = [];
  countryActivation!: number;
  countryInfo: CountryInfoDto = {
    countryID: 0,
    countryGroupID: 0,
    isActive: false,
    countryProfileID: 0
  }
  bank:BankDto = {
    bankID: 0,
    countryProfileID: 0
  }
  broker : BrokerDto = {
    brokerID: 0,
    countryProfileID: 0
  }
  economicIndicator : EconomicIndicatorDto = {
    economicIndicatorID: 0,
    economicIndicatorTypeID: 0,
    countryProfileID: 0,
    year: 0,
    value: 0,
    valueDeterminationID: 0
  }

  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  activationDropdown: any[] = [
    { value: 0, displayText: 'No' },
    { value: 1, displayText: 'Yes' },
  ];
  constructor( private permissionService: PermissionService,
               private countryService: CountryService
  ) {

    this.permission = {
      create: false,
      edit : false,
      delete  :false
    }
   
  }
  ngOnInit() {

    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_Country + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_Country + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(CompanyAndMarket_Country + '.Delete')) {
      this.permission.delete = true;
    }
    this.countryID = 0
    this.getCountryInfos();
  }

  getCountryInfos() {
    this.loading = true;
    this.countryService.getCountryInfosByCountryID(this.countryID).subscribe(res => {
      debugger;
      this.countryGroups = res.countryGroups;
      this.countries = res.countries;
      this.countryInfos = res.countryInfos;
      this.banks = res.banks;
      this.brokers = res.brokers;
      this.economicIndicators = res.economicIndicators;
      this.economicIndicatorTypes = res.economicIndicatorTypes;
      this.valueDeterminations = res.valueDeterminations;
      this.loading = false;
      if (this.countryInfos.length > 0 && this.countryID == 0) {
        this.countryID = this.countryGroups[0].countryGroupID;
        this.handleCountryInfo()
        this.loading = false;
      }else if(this.countryInfos.length > 0 && this.countryID > 0){
        this.handleCountryInfo()
        this.loading = false;
      }else{
        this.loading = false;
      }
    });
  }

  handleCountryInfo() {
    debugger;
    this.countryInfo = this.countryInfos.find(f => f.countryID == this.countryID);
    this.countryActivation = this.countryInfo.isActive ? 1 : 0;
    this.addNewBank();
    this.addNewBroker();
    this.addNewEconomicIndicator();
    this.loading = false;
  }

  addNewCountry() {
    this.countryInfo =  {
      countryID: 0,
      countryGroupID: 0,
      isActive: false,
      countryProfileID: 0
    };
  }

  insertCountry() {
    debugger;
    this.loading = true;
    this.countryInfo.isActive = this.countryActivation == 1 ? true : false;
    this.countryService.insertCountryInfoByModel(this.countryInfo).subscribe(res => {
      debugger;
      if (this.countryInfo.countryID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.countryInfo.country + ' updated successfully', icon: 'success', });
        // this.addNewCountry();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.countryInfo.country + ' created successfully', icon: 'success', });
        // this.addNewCountry();
      }
      this.getCountryInfos();
      // this.handleCorporateAnnouncement(this.corporateAnnouncement);

      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }

  handleBank() {
    debugger;
    this.bank = this.banks.find(f => f.countryProfileID == this.countryInfo.countryProfileID);
    this.loading = false;
  }

  addNewBank() {
    this.bank =  {
      bankID: 0,
      countryProfileID: 0
    };
  }

  insertBank() {
    debugger;
    this.loading = true;
    this.bank.countryProfileID = this.countryInfo.countryProfileID
    this.countryService.insertBankByModel(this.bank).subscribe(res => {
      debugger;
      if (this.bank.bankID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.bank.bank + ' updated successfully', icon: 'success', });
        this.addNewBank();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.bank.bank + ' created successfully', icon: 'success', });
        this.addNewBank();
        this.getCountryInfos();
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

  handleBroker() {
    debugger;
    this.broker = this.brokers.find(f => f.countryProfileID == this.countryInfo.countryProfileID);
    this.loading = false;
  }

  addNewBroker() {
    this.broker =  {
      brokerID: 0,
      countryProfileID: 0
    };
  }

  insertBroker() {
    debugger;
    this.loading = true;
    this.broker.countryProfileID = this.countryInfo.countryProfileID
    this.countryService.insertBrokerByModel(this.broker).subscribe(res => {
      debugger;
      if (this.broker.brokerID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.broker.broker + ' updated successfully', icon: 'success', });
        this.addNewBroker();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.broker.broker + ' created successfully', icon: 'success', });
        this.addNewBroker();
        this.getCountryInfos();
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

  handleEconomicIndicator() {
    debugger;
    this.economicIndicator = this.economicIndicators.find(f => f.countryProfileID == this.countryInfo.countryProfileID);
    this.loading = false;
  }

  addNewEconomicIndicator() {
    this.economicIndicator =  {
      economicIndicatorID: 0,
      economicIndicatorTypeID: 0,
      countryProfileID: 0,
      year: 0,
      value: 0,
      valueDeterminationID: 0
    };
  }

  insertEconomicIndicator() {
    debugger;
    this.loading = true;
    this.economicIndicator.countryProfileID = this.countryInfo.countryProfileID
    this.countryService.insertEconomicIndicatorByModel(this.economicIndicator).subscribe(res => {
      debugger;
      if (this.economicIndicator.economicIndicatorID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.economicIndicator.description + ' updated successfully', icon: 'success', });
        this.addNewEconomicIndicator();
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.economicIndicator.description + ' created successfully', icon: 'success', });
        this.addNewEconomicIndicator();
        this.getCountryInfos();
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

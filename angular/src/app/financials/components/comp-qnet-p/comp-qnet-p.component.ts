import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { PermissionService } from '@abp/ng.core';
import { Financial_CompQnetP } from 'src/app/services/permissions';
import { CommonModule, NgFor } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { CompaniesQNetProfitDto, CompaniesQNetProfitService, CurrencyOutstandingDto } from '@proxy/companies-qnet-profits';
import { CommonService } from '@proxy/commons';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comp-qnet-p',
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
    CheckboxModule,
    ThemeSharedModule,
    ReactiveFormsModule,
    ListboxModule,
    InputTextModule,
  ],
  templateUrl: './comp-qnet-p.component.html',
  styleUrl: './comp-qnet-p.component.scss'
})
export class CompQnetPComponent {
  loading: boolean = false;
  headerValue: any;
  selectedItem: any;
  clickedIndex = 0;
  suggestions: any[] = [];
  sectorID: number;
  stockMarketID: number;
  companyID: number = 0;
  lastcompanyID: number = this.companyID;
  rate: number = 0;
  stockMarkets = [];
  companyMarketSectors = [];
  companiesTickers = [];
  periodTypes = [];
  qPeriods = [];
  divindedDates = [];
  strEA: String = ''
  strAA: String = ''
  Result :boolean=false
  FirstCon:boolean=false
  companiesQNetProfits: CompaniesQNetProfitDto[] = [];
  currencyOutstandings: CurrencyOutstandingDto[];
  companiesQNetProfit: CompaniesQNetProfitDto = {
    compQNProfitID: 0,
    companyID: 0,
    year: 0,
    qPeriodID: 0,
    periodTypeID: 0,
    isYearly: false,
    netProfit: 0
  }
  permission: {
    create: boolean;
    edit: boolean,
    delete: boolean
  }
  constructor(
    private permissionService: PermissionService,
    private commonService: CommonService,
    private companiesQNetProfitService: CompaniesQNetProfitService,
  ) {
    this.permission = {
      create: false,
      edit: false,
      delete: false
    }
  }
  ngOnInit() {
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.Create')) {
      this.permission.create = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.Edit')) {
      this.permission.edit = true;
    }
    if (this.permissionService.getGrantedPolicy(Financial_CompQnetP + '.Delete')) {
      this.permission.delete = true;
    }

    this.getStockMarkets();
  }

  search(event: AutoCompleteCompleteEvent) {
    // this.loading = true;
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
    this.companyID = event.value.companyID
    this.getCompMSectorsByMarketID();
    this.selectedItem = null;
    this.loading = false;
  }

  getStockMarkets() {
    this.commonService.getCompStockMarkets().subscribe(res => {
      this.stockMarkets = res;
      if (this.stockMarkets.length > 0) {
        this.stockMarketID = this.stockMarkets[0].stockMarketID;
        this.getCompMSectorsByMarketID();
      }
    });
  }

  getCompMSectorsByMarketID() {
    debugger;
    this.loading = true;
    this.commonService.getCompMSectorsByMarketID(this.stockMarketID).subscribe(res => {
      this.companyMarketSectors = res.marketSectors;
      if (this.companyMarketSectors.length > 0) {
        this.sectorID = this.companyMarketSectors[0].sectorID;
        this.getSectorCompaniesBySectorIDAndStockMarketID();
      }
      else { this.loading = false; }
    });
  }

  getSectorCompaniesBySectorIDAndStockMarketID() {
    debugger;
    if (this.sectorID == undefined && this.companyMarketSectors.length > 0)
      this.sectorID = this.companyMarketSectors[0].sectorID;
    this.commonService
      .getCompaniesForQNPBySectorIDAndMarketID(this.sectorID, this.stockMarketID)
      .subscribe(res => {
        this.companiesTickers = res.companies;
        this.periodTypes = res.periodTypes;
        this.qPeriods = res.qPeriods;
        if (this.companiesTickers.length > 0) this.getCompaniesQNetProfitsByCompanyID();
        else this.loading = false;
      });
  }

  getCompaniesQNetProfitsByCompanyID() {
    debugger;
    if (this.companyID == undefined && this.companiesTickers.length > 0)
      this.companyID = this.companiesTickers[0].companyID;
    this.companiesQNetProfitService
      .getCompaniesQNetProfitsByCompanyID(this.companyID)
      .subscribe(res => {
        debugger;
        this.companiesQNetProfits = res.companiesQNetProfits;
        this.currencyOutstandings=res.currencyOutstandings;
        if (this.companiesQNetProfits.length > 0)
          this.handleCompaniesQNetProfit(this.companiesQNetProfits[0]);
        else this.loading = false;
      });
  }

  addNewCompaniesQNetProfit() {
    this.companiesQNetProfit = {
      compQNProfitID: 0,
      companyID: 0,
      year: 0,
      qPeriodID: 0,
      periodTypeID: 0,
      isYearly: false,
      netProfit: 0
    };
  }


  onListBoxSelectionChange(event: any) {
    if(this.companyID == null)
      this.companyID = this.lastcompanyID;
    else
    this.lastcompanyID = this.companyID;
  }

  insertUpdateCalculateCompQuartersNetProfitByInput() {
    debugger;
    this.loading = true;
    this.companiesQNetProfit.companyID = this.companyID;
    // this.companiesQNetProfit.asOfDate = moment(this.companiesQNetProfit.asOfDate).format();
    // this.companiesQNetProfit.announcementDate = moment(this.companiesQNetProfit.announcementDate).format();



    this.companiesQNetProfitService.insertUpdateCalculateCompQuartersNetProfitByInput(this.companiesQNetProfit).subscribe(res => {
      debugger;
      if (this.companiesQNetProfit.compQNProfitID > 0) {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.companiesQNetProfit.remarks + ' updated successfully', icon: 'success', });
      }
      else {
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 4000, title: 'Success!', text: this.companiesQNetProfit.remarks + ' created successfully', icon: 'success', });
      }
      this.addNewCompaniesQNetProfit();
      this.getCompaniesQNetProfitsByCompanyID();
      this.loading = false;
    },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      });
  }
  deleteCorporateAnnouncement(Id: number) {

    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this Quarters NetProfit?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.companiesQNetProfitService.deleteCompQuartersNetProfitByCompQNProfitID(Id).subscribe((res) => {
          Swal.fire({
            title: 'Success',
            text: 'Quarters NetProfit Deleted Successfully',
            icon: 'success',
          }).then((result) => {

            this.loading = false;
            this.addNewCompaniesQNetProfit();
            this.getCompaniesQNetProfitsByCompanyID();
          });

        });
      }
    })
  }

  handleCompaniesQNetProfit(companiesQNetProfit: CompaniesQNetProfitDto) {
    debugger;
    this.companiesQNetProfit = companiesQNetProfit;
    if (this.companiesQNetProfit.asOfDate)
      this.companiesQNetProfit.asOfDate = moment(this.companiesQNetProfit.asOfDate).format("MM/DD/YYYY")
    if (this.companiesQNetProfit.announcementDate)
      this.companiesQNetProfit.announcementDate = moment(this.companiesQNetProfit.announcementDate).format("MM/DD/YYYY")
     this.FirstCon=false;
    this.getEarningAnnouncementEn()
    this.getEearningAnncoucementAr();
    this.loading = false;
  }
  getEarningAnnouncementEn() {
    if (this.companiesQNetProfit.netProfit === 0) {
      return;
    }
  
    // Determine Net Profit or Net Loss
    if (this.companiesQNetProfit.netProfit > 0 && this.companiesQNetProfit.previousNP > 0) {
      this.strEA = "Net profit";
      this.FirstCon = true;
    } else if (this.companiesQNetProfit.netProfit > 0) {
      this.strEA = "Net profit";
    } else if (this.companiesQNetProfit.netProfit < 0 && this.companiesQNetProfit.previousNP < 0) {
      this.strEA = "Net loss";
    }
  
    this.strEA += " announced for the";
  
    // Fetch last year's financial end record asynchronously
    this.companiesQNetProfitService
      .getLastYearFinEndRecordForQNPByCompanyIDAndYear(
        this.companiesQNetProfit.companyID,
        this.companiesQNetProfit.year
      )
      .subscribe(
        (result) => {
          this.Result = result;
  
          // Extract date once to avoid redundant `new Date()` calls
          const asOfDate = new Date(this.companiesQNetProfit.asOfDate);
          const formattedDate = `${asOfDate.getDate()}/${asOfDate.getMonth() + 1}/${asOfDate.getFullYear()}`;
  
          if (this.Result) {
            // Format based on qPeriodID
            switch (this.companiesQNetProfit.qPeriodID) {
              case 1:
                this.strEA += ` 1st Quarter of the year ${asOfDate.getFullYear()}`;
                break;
              case 2:
                this.strEA += ` 1st Half of the year ${asOfDate.getFullYear()}`;
                break;
              case 3:
                this.strEA += ` 9 months ended ${formattedDate}`;
                break;
              case 4:
                this.strEA += ` year ${asOfDate.getFullYear()}`;
                break;
            }
          } else {
            // Format based on periodTypeID
            switch (this.companiesQNetProfit.periodTypeID) {
              case 1:
                this.strEA += ` 3 months ended of the year ${formattedDate}`;
                break;
              case 2:
                this.strEA += ` 6 months ended of the year ${formattedDate}`;
                break;
              case 3:
                this.strEA += ` 9 months ended ${formattedDate}`;
                break;
              case 4:
                this.strEA += ` year ended ${asOfDate.getFullYear()}`;
                break;
            }
          }
  
          // Append currency and process net profit value
          this.strEA += `, ${this.currencyOutstandings[0].currency}`;
          this.setCurrentValueinBillMill(this.companiesQNetProfit.netProfit, true);
          this.setConditionEAForNegPosNetProfit();
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );
  }
  
  setCurrentValueinBillMill(currentOrPreviousValue: number, isPos: boolean): String {
    this.strEA   += " ";
    currentOrPreviousValue = Math.abs(currentOrPreviousValue);
   if (isPos)
   {
    if (currentOrPreviousValue >= 1_000_000) {
      this.strEA += (currentOrPreviousValue / 1_000_000).toFixed(2) + " billion";
    } else if (currentOrPreviousValue > 1_000 && currentOrPreviousValue < 1_000_000) {
      this.strEA += ((currentOrPreviousValue / 1_000_000) * 1000).toFixed(2) + " million";
    } else if (currentOrPreviousValue < 1_000) {
      this.strEA += (currentOrPreviousValue * 1000).toFixed(2);
    
    }
  }
  else
  {
    if (currentOrPreviousValue >= 1_000_000) {
      this.strEA += (currentOrPreviousValue / 1_000_000).toFixed(2) + " billion";
    } else if (currentOrPreviousValue > 1_000 && currentOrPreviousValue < 1_000_000) {
      this.strEA += ((currentOrPreviousValue / 1_000_000) * 1000).toFixed(2) + " million";
    } else if (currentOrPreviousValue < 1_000) {
      this.strEA += (currentOrPreviousValue * 1000).toFixed(2);
    
    }
  }
   
    return this.strEA;
  }
  
  setConditionEAForNegPosNetProfit(): void {
    if (this.FirstCon) {
      if (!this.companiesQNetProfit.netProfitChange || this.companiesQNetProfit.netProfitChange === 0) {
        return;
      }
  
      this.strEA += ", ";
  
      if (this.companiesQNetProfit.netProfitChange < 0) {
        this.strEA += "a decrease of ";
      } else {
        this.strEA += "an increase of ";
      }
  
      const netProfitChange = Math.abs(this.companiesQNetProfit.netProfitChange);
  
      if (netProfitChange > 5) {
        this.strEA += `${netProfitChange.toFixed(0)}%`;
      } else if ( this.companiesQNetProfit.netProfitChange >= 0 && netProfitChange < 5) {
        this.strEA += `${netProfitChange.toFixed(1)}%`;
      } else if ( this.companiesQNetProfit.netProfitChange > -5 && netProfitChange < 0) {
        this.strEA += `${netProfitChange.toFixed(1)}%`;
      } else if (this.companiesQNetProfit.netProfitChange < -5) {
        this.strEA += `${netProfitChange.toFixed(0)}%`;
      }
    } else {
      if (this.companiesQNetProfit.previousNP == null) {
        this.strEA += ".";
        return;
      }
  
      this.strEA += ", compared to ";
  
      if (this.companiesQNetProfit.previousNP < 0) {
        this.strEA += `loss of ${this.currencyOutstandings[0].currency}`;
      } else {
        this.strEA += `net profit of ${this.currencyOutstandings[0].currency}`;
      }
  
      this.setCurrentValueinBillMill(this.companiesQNetProfit.previousNP, false);
      this.strEA += " for the same period last year.";
    }
  
    this.strEA += ".";
    //alert(this.strEA)
  }

  getEearningAnncoucementAr() {
    if (this.companiesQNetProfit.netProfit === 0) {
      return;
    }
  this.strAA="تم إعلان "
    // Determine Net Profit or Net Loss
    if (this.companiesQNetProfit.netProfit > 0 && this.companiesQNetProfit.previousNP > 0) {
      this.strAA +=  "الأرباح الصافية ";
      this.FirstCon = true;
    } else if (this.companiesQNetProfit.netProfit > 0) {
      this.strAA += "الأرباح الصافية ";
    } else if (this.companiesQNetProfit.netProfit < 0 && this.companiesQNetProfit.previousNP < 0) {
      this.strAA +=  "الخسائر الصافية ";
    }
  
    
  
    // Fetch last year's financial end record asynchronously
    
          // Extract date once to avoid redundant `new Date()` calls
          const asOfDate = new Date(this.companiesQNetProfit.asOfDate);
          const formattedDate = `${asOfDate.getDate()}/${asOfDate.getMonth() + 1}/${asOfDate.getFullYear()}`;
  
          if (this.Result) {
            // Format based on qPeriodID
            switch (this.companiesQNetProfit.qPeriodID) {
              case 1:
                this.strAA += ` للربع الأول من العام  ${asOfDate.getFullYear()}`;
                break;
              case 2:
                this.strAA += ` للنصف الأول من العام  ${asOfDate.getFullYear()}`;
                break;
              case 3:
                this.strAA += ` لل 9 أشهر  ${formattedDate}`;
                break;
              case 4:
                this.strAA += ` لعام ${asOfDate.getFullYear()}`;
                break;
            }
          } else {
            // Format based on periodTypeID
            switch (this.companiesQNetProfit.periodTypeID) {
              case 1:
                this.strAA += ` لل3 أشهر المنتهية في ${formattedDate}`;
                break;
              case 2:
                this.strAA += ` لل6 أشهر المنتهية في ${formattedDate}`;
                break;
              case 3:
                this.strEA += `لل9 أشهر ${formattedDate}`;
                break;
              case 4:
                this.strAA += ` للسنة المالية المنتهية في  ${asOfDate.getFullYear()}`;
                break;
            }
          }
  
          // Append currency and process net profit value
           //this.strAA += `, ${this.currencyOutstandings[0].aDescription}`;
          
            this.setCurrentValueinBillMillAR(this.companiesQNetProfit.netProfit, true);(this.companiesQNetProfit.netProfit, true);
           this.setConditionEAForNegPosNetProfitAR();
        
        }
        setCurrentValueinBillMillAR(currentOrPreviousValue: number, isPos: boolean): String {
          this.strAA   += " ";
          currentOrPreviousValue = Math.abs(currentOrPreviousValue);
         if (isPos)
         {
          if (currentOrPreviousValue >= 1_000_000) {
            this.strAA += (currentOrPreviousValue / 1_000_000).toFixed(2) + " مليار " + this.currencyOutstandings[0].aDescription;
          } else if (currentOrPreviousValue > 1_000 && currentOrPreviousValue < 1_000_000) {
            this.strAA += ((currentOrPreviousValue / 1_000_000) * 1000).toFixed(2) + " مليون" + this.currencyOutstandings[0].aDescription;
          } else if (currentOrPreviousValue < 1_000) {
            this.strAA += (currentOrPreviousValue * 1000).toFixed(2);
          
          }
        }
        else
        {
          if (currentOrPreviousValue >= 1_000_000) {
            this.strAA += (currentOrPreviousValue / 1_000_000).toFixed(2) + " مليار " + this.currencyOutstandings[0].aDescription;
          } else if (currentOrPreviousValue > 1_000 && currentOrPreviousValue < 1_000_000) {
            this.strAA += ((currentOrPreviousValue / 1_000_000) * 1000).toFixed(2) + " مليون " + this.currencyOutstandings[0].aDescription;
          } else if (currentOrPreviousValue < 1_000) {
            this.strAA += (currentOrPreviousValue * 1000).toFixed(2);
          
          }
        }
        // alert(this.strAA)
          return this.strAA;
        }

        setConditionEAForNegPosNetProfitAR(): void {
          if (this.FirstCon) {
            if (!this.companiesQNetProfit.netProfitChange || this.companiesQNetProfit.netProfitChange === 0) {
              return;
            }
        
            this.strAA += ", ";
        
            if (this.companiesQNetProfit.netProfitChange < 0) {
              this.strAA += "بإنخفاض قدره  ";
            } else {
              this.strAA += "بزيادة قدرها ";
            }
        
            const netProfitChange = Math.abs(this.companiesQNetProfit.netProfitChange);
        
            if (netProfitChange > 5) {
              this.strAA += `% ${netProfitChange.toFixed(0)}  `;
            } else if ( this.companiesQNetProfit.netProfitChange >= 0 && netProfitChange < 5) {
              this.strAA += `% ${netProfitChange.toFixed(1)} `;
            } else if ( this.companiesQNetProfit.netProfitChange > -5 && netProfitChange < 0) {
              this.strAA += `% ${netProfitChange.toFixed(1)}  `;
            } else if (this.companiesQNetProfit.netProfitChange < -5) {
              this.strAA += `%  ${netProfitChange.toFixed(0)}   `;
            }
          } else {
            if (this.companiesQNetProfit.previousNP == null) {
              this.strAA += ".";
              return;
            }
        
            this.strAA += ",  مقارنة ";
        
            if (this.companiesQNetProfit.previousNP < 0) {
              this.strAA += `بخسائر  ${this.currencyOutstandings[0].currency}`;
            } else {
              this.strAA += ` بأرباح  ${this.currencyOutstandings[0].currency}`;
            }
        
            this.setCurrentValueinBillMillAR(this.companiesQNetProfit.previousNP, false);
            this.strAA += " لنفس الفترة من العام السابق";
          }
        
          this.strAA += ".";
        //  alert(this.strAA)
        }
        
}

import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RestService, Rest } from '@abp/ng.core';
import { GbFactsComponent } from 'src/app/application/components/gb-facts/gb-facts.component';
import { AccountsClassificationComponent } from 'src/app/application/components/accounts-classification/accounts-classification.component';
import { EconomicAndStatisticalDataComponent } from 'src/app/application/components/economic-and-statistical-data/economic-and-statistical-data.component';
import { GbUniversalFactsViewComponent } from 'src/app/application/components/gb-universal-facts-view/gb-universal-facts-view.component';
import { GbUniversalFactsComponent } from 'src/app/application/components/gb-universal-facts/gb-universal-facts.component';
import { GbirComponent } from 'src/app/application/components/gbir/gbir.component';
import { LhscUploadComponent } from 'src/app/application/components/lhsc-upload/lhsc-upload.component';
import { OwnershipComponent } from 'src/app/application/components/ownership/ownership.component';
import { ProductsServicesAndRawMaterialsComponent } from 'src/app/application/components/products-services-and-raw-materials/products-services-and-raw-materials.component';
import { ReportsComponent } from 'src/app/application/components/reports/reports.component';
import { CountryGroupComponent } from 'src/app/markets/components/country-group/country-group.component';
import { CountriesComponent } from 'src/app/markets/components/countries/countries.component';
import { CountryProfileAdminComponent } from 'src/app/markets/components/country-profile-admin/country-profile-admin.component';
import { CountryProfileComponent } from 'src/app/markets/components/country-profile/country-profile.component';
import { MarketSectorComponent } from 'src/app/markets/components/market-sector/market-sector.component';
import { CurrencyExchangeComponent } from 'src/app/markets/components/currency-exchange/currency-exchange.component';
import { CompaniesComponent } from 'src/app/companies/components/companies/companies.component';
import { ManagementComponent } from 'src/app/companies/components/management/management.component';
import { OwnershipCompaniesComponent } from 'src/app/companies/components/ownership-companies/ownership-companies.component';
import { AnnouncementsComponent } from 'src/app/companies/components/announcements/announcements.component';
import { MutaulFundsComponent } from 'src/app/companies/components/mutaul-funds/mutaul-funds.component';
import { MutaulFundsSettingsComponent } from 'src/app/companies/components/mutaul-funds-settings/mutaul-funds-settings.component';
import { IposComponent } from 'src/app/companies/components/ipos/ipos.component';
import { AccountsComponent } from 'src/app/companies/components/accounts/accounts.component';
import { SegmentAccountsComponent } from 'src/app/companies/components/segment-accounts/segment-accounts.component';
import { UpdateOwnershipFactsComponent } from 'src/app/companies/components/update-ownership-facts/update-ownership-facts.component';
import { CompaniesProductsServicesRawMaterialsUpdatesComponent } from 'src/app/companies/components/companies-products-services-raw-materials-updates/companies-products-services-raw-materials-updates.component';
import { CountryAccountsComponent } from 'src/app/companies/components/country-accounts/country-accounts.component';
import { CountryAccountsFactsOrderComponent } from 'src/app/companies/components/country-accounts-facts-order/country-accounts-facts-order.component';
import { AgenciesRatingComponent } from 'src/app/companies/components/agencies-rating/agencies-rating.component';
import { CompaniesAgenciesAndRatingsComponent } from 'src/app/companies/components/companies-agencies-and-ratings/companies-agencies-and-ratings.component';
import { EconomicAndBusinessComponent } from 'src/app/news/components/economic-and-business/economic-and-business.component';
import { MarketComponent } from 'src/app/news/components/market/market.component';
import { CompanyComponent } from 'src/app/news/components/company/company.component';
import { GulfbaseComponent } from 'src/app/news/components/gulfbase/gulfbase.component';
import { EnglishComponent } from 'src/app/news/components/english/english.component';
import { ArabicComponent } from 'src/app/news/components/arabic/arabic.component';
import { EndOfDayComponent } from 'src/app/prices/components/end-of-day/end-of-day.component';
import { IntraDayComponent } from 'src/app/prices/components/intra-day/intra-day.component';
import { OfficialComponent } from 'src/app/prices/components/official/official.component';
import { GulfbasePriceComponent } from 'src/app/prices/components/gulfbase-price/gulfbase-price.component';
import { FundPricesComponent } from 'src/app/prices/components/fund-prices/fund-prices.component';
import { UploadComponent } from 'src/app/financials/components/upload/upload.component';
import { EntryComponent } from 'src/app/financials/components/entry/entry.component';
import { ReEntryComponent } from 'src/app/financials/components/re-entry/re-entry.component';
import { ReviewerComponent } from 'src/app/financials/components/reviewer/reviewer.component';
import { ReviewerNewComponent } from 'src/app/financials/components/reviewer-new/reviewer-new.component';
import { CurrentValuesComponent } from 'src/app/financials/components/current-values/current-values.component';
import { FinancialsAdminComponent } from 'src/app/financials/components/financials-admin/financials-admin.component';
import { CompQnetPComponent } from 'src/app/financials/components/comp-qnet-p/comp-qnet-p.component';
import { QnetProfitReportComponent } from 'src/app/financials/components/qnet-profit-report/qnet-profit-report.component';
import { CurrentDividendsComponent } from 'src/app/financials/components/current-dividends/current-dividends.component';
import { EnhancedRatiosComponent } from 'src/app/financials/components/enhanced-ratios/enhanced-ratios.component';
import { HistoricalCashDividendsComponent } from 'src/app/financials/components/historical-cash-dividends/historical-cash-dividends.component';
import { UploadIndicatorsBatchComponent } from 'src/app/financials/components/upload-indicators-batch/upload-indicators-batch.component';
import { BatchesEntryComponent } from 'src/app/financials/components/batches-entry/batches-entry.component';
import { BatchesReEntryComponent } from 'src/app/financials/components/batches-re-entry/batches-re-entry.component';
import { BatchesAdminComponent } from 'src/app/financials/components/batches-admin/batches-admin.component';

class Menu {
  title: string;
  menuItems:MenuItem[];
}

class MenuItem{
  href: string;
  title: string;
  component: Type<any>;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
  private menusSubject = new BehaviorSubject<Menu[]>([]);
  menus$ = this.menusSubject.asObservable();
  menu : Menu[];
  

constructor(){
  this.menu = [
    {title:"Application", menuItems:
      [
      { href:"gb-facts", title:"Gb Facts", component:GbFactsComponent },
      { href:"account-classification", title:"Accounts Classificartion", component:AccountsClassificationComponent },
      { href:"ownership", title:"Ownership", component:OwnershipComponent },
      { href:"reports", title:"Reports", component:ReportsComponent },
      { href:"lhsc-upload", title:"LHSC Upload", component:LhscUploadComponent },
      { href:"gbir", title:"GBIR", component:GbirComponent },
      { href:"gbir-universal-facts", title:"GBIR Universal Facts", component:GbUniversalFactsComponent },
      { href:"gbir-universal-facts-view", title:"GBIR Universal Facts View", component:GbUniversalFactsViewComponent },
      { href:"products-services-and-raw-materials", title:"Products Services And Raw Materials", component:ProductsServicesAndRawMaterialsComponent },
      { href:"economic-and-statistical-data", title:"Economic and Statistical Data", component:EconomicAndStatisticalDataComponent },
      ]
    },
    {title:"Companies and Markets", menuItems:
      [
      { href:"country-group", title:"Country-Group", component:CountryGroupComponent },
      { href:"countries", title:"Countries", component:CountriesComponent },
      { href:"country-profile-admin", title:"Country Profile (Admin)", component:CountryProfileAdminComponent },
      { href:"country-profile", title:"Country Profile", component:CountryProfileComponent },
      { href:"market-sector", title:"Market-Sector", component:MarketSectorComponent },
      { href:"currency-exchange", title:"Currency Exchange", component:CurrencyExchangeComponent },

      ]
    },
    {title:"Companies", menuItems:
      [
      { href:"companies", title:"Companies", component:CompaniesComponent },
      { href:"management", title:"Management", component:ManagementComponent },
      { href:"ownership-companies", title:"Ownership (Companies)", component:OwnershipCompaniesComponent },      
      { href:"announcements", title:"Announcements", component:AnnouncementsComponent },
      { href:"mutaul-funds", title:"Mutaul Funds", component:MutaulFundsComponent },
      { href:"mutaul-funds-settings", title:"Mutaul Funds Settings", component:MutaulFundsSettingsComponent },
      { href:"ipos", title:"IPOs", component:IposComponent },
      { href:"accounts", title:"Accounts", component:AccountsComponent },
      { href:"accounts-custom-order", title:"Accounts Custom Order", component:AccountsComponent },
      { href:"segment-accounts", title:"Segment Accounts", component:SegmentAccountsComponent },
      { href:"update-ownership-facts", title:"Update Ownership Facts", component:UpdateOwnershipFactsComponent },
      { href:"estimates-and-forecasts", title:"Estimates and Forecasts", component:UpdateOwnershipFactsComponent },
      { href:"companies-products-services-raw-materials-updates", title:"Companies Products Services Raw Materials Updates", component:CompaniesProductsServicesRawMaterialsUpdatesComponent },
      { href:"country-accounts", title:"Country Accounts", component:CountryAccountsComponent },
      { href:"country-accounts-facts-order", title:"Country Accounts Facts Order", component:CountryAccountsFactsOrderComponent },
      { href:"agencies-rating", title:"Agencies Rating", component:AgenciesRatingComponent },
      { href:"companies-agencies-and-ratings", title:"Companies Agencies and Ratings", component:CompaniesAgenciesAndRatingsComponent },
    ]
    },
    {title:"News", menuItems:
      [
      { href:"economic-and-business", title:"Economic & Business", component:EconomicAndBusinessComponent },
      { href:"market", title:"Market", component:MarketComponent },
      { href:"company", title:"Company", component:CompanyComponent },      
      { href:"gulfbase", title:"Gulfbase", component:GulfbaseComponent },
      { href:"english", title:"English", component:EnglishComponent },
      { href:"arabic", title:"Arabic", component:ArabicComponent },
    ]
    },
    {title:"Prices & Indices", menuItems:
      [
      { href:"end-of-day", title:"End Of Day", component:EndOfDayComponent },
      { href:"intra-day", title:"Intra Day", component:IntraDayComponent },
      { href:"official", title:"Official", component:OfficialComponent },      
      { href:"gulfbase-price", title:"Gulfbase (Price)", component:GulfbasePriceComponent },
      { href:"fund-prices", title:"Fund Prices", component:FundPricesComponent },
       
    ]
    },
    {title:"Financials", menuItems:
      [
      { href:"upload", title:"Upload", component:UploadComponent },
      { href:"entry", title:"Entry", component:EntryComponent },
      { href:"re-entry", title:"Re Entry", component:ReEntryComponent },      
      { href:"reviewer", title:"Reviewer", component:ReviewerComponent },
      { href:"reviewer-news", title:"Reviewer (New)", component:ReviewerNewComponent },
      { href:"current-values", title:"Current Values", component:CurrentValuesComponent },
      { href:"financials-admin", title:"Financials (Admim)", component:FinancialsAdminComponent },
      { href:"comp-qnet-p", title:"CompQnetP", component:CompQnetPComponent },
      { href:"qnet-profit-report", title:"QNet Profit Report", component:QnetProfitReportComponent },
      { href:"current-dividends", title:"Current Dividends", component:CurrentDividendsComponent },
      { href:"enhanced-ratios", title:"Enhanced Ratios", component:EnhancedRatiosComponent },
      { href:"historical-cash-dividends", title:"Historical Cash Dividends", component:HistoricalCashDividendsComponent },
      { href:"upload-indicators-batch", title:"Upload Indicators Batch", component:UploadIndicatorsBatchComponent },
      { href:"batches-entry", title:"Batches Entry", component:BatchesEntryComponent },
      { href:"batches-re-entry", title:"Batches ReEntry", component:BatchesReEntryComponent },
      { href:"batches-admin", title:"Batches (Admin)", component:BatchesAdminComponent },
    ]
    }


  ]
  this.menusSubject.next(this.menu);
}

}
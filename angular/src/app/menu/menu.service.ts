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
import { AccountsCustomOrderComponent } from 'src/app/companies/components/accounts-custom-order/accounts-custom-order.component';
import { EstimatesAndForecastsComponent } from 'src/app/companies/components/estimates-and-forecasts/estimates-and-forecasts.component';
import { GlobalIndicesComponent } from 'src/app/prices/components/global-indices/global-indices.component';
import { Application, Application_AccountsClassification, Application_EconomicAndStatisticalData, Application_GbFacts, Application_Gbir, Application_GbUniversalFacts, Application_LhscUpload, Application_Ownership, Application_ProductsServicesAndRawMaterials, Application_Reports, Company, Company_Accounts, Company_AccountsCustomOrder, Company_AgenciesRating, Company_Announcements, Company_CompaniesAgenciesAndRatings, Company_CompaniesProductsServicesRawMaterialsUpdates, Company_Company, Company_CountryAccounts, Company_CountryAccountsFactsOrder, Company_EstimatesAndForecasts, Company_Ipos, Company_Management, Company_MutaulFunds, Company_MutaulFundsSettings, Company_Ownership, Company_UpdateOwnershipFacts, CompanyAndMarket, CompanyAndMarket_Country, CompanyAndMarket_CountryGroup, CompanyAndMarket_CountryProfile, CompanyAndMarket_CurrencyExchange, CompanyAndMarket_MarketSector, Financial, Financial_BatchesAdmin, Financial_BatchesEntry, Financial_BatchesReEntry, Financial_CompQnetP, Financial_CurrentDividends, Financial_CurrentValues, Financial_EnhancedRatios, Financial_Entry, Financial_FinancialsAdmin, Financial_HistoricalCashDividends, Financial_QnetProfitReport, Financial_ReEntry, Financial_Reviewer, Financial_ReviewerNew, Financial_Upload, Financial_UploadIndicatorsBatch, News, News_Arabic, News_EconomicAndBusiness, News_English, News_Gulfbase, News_Market, PriceAndIndices, PriceAndIndices_EndOfDay, PriceAndIndices_FundPrices, PriceAndIndices_GlobalIndices, PriceAndIndices_GulfbasePrice, PriceAndIndices_IntraDay, PriceAndIndices_Official } from 'src/app/services/permissions';

class Menu {
  title: string;
  permission: string;
  active:boolean = false;
  menuItems:MenuItem[];
}

class MenuItem{
  href: string;
  permission: string;
  active:boolean = false;
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
    {
      title: "Application", permission: Application, menuItems: [
        {
          href: "gb-facts", title: "Gb Facts", permission: Application_GbFacts, component: GbFactsComponent,
          active: false
        },
        {
          href: "account-classification", title: "Accounts Classificartion", permission: Application_AccountsClassification, component: AccountsClassificationComponent,
          active: false
        },
        {
          href: "ownership", title: "Ownership", permission: Application_Ownership, component: OwnershipComponent,
          active: false
        },
        {
          href: "reports", title: "Reports", permission: Application_Reports, component: ReportsComponent,
          active: false
        },
        {
          href: "lhsc-upload", title: "LHSC Upload", permission: Application_LhscUpload, component: LhscUploadComponent,
          active: false
        },
        {
          href: "gbir", title: "GBIR", permission: Application_Gbir, component: GbirComponent,
          active: false
        },
        {
          href: "gbir-universal-facts", title: "GBIR Universal Facts", permission: Application_GbUniversalFacts, component: GbUniversalFactsComponent,
          active: false
        },
        {
          href: "gbir-universal-facts-view", title: "GBIR Universal Facts View", permission: Application_GbFacts, component: GbUniversalFactsViewComponent,
          active: false
        },
        {
          href: "products-services-and-raw-materials", title: "Products Services And Raw Materials", permission: Application_ProductsServicesAndRawMaterials, component: ProductsServicesAndRawMaterialsComponent,
          active: false
        },
        {
          href: "economic-and-statistical-data", title: "Economic and Statistical Data", permission: Application_EconomicAndStatisticalData, component: EconomicAndStatisticalDataComponent,
          active: false
        },
      ],
      active: false
    },
    {
      title: "Companies and Markets", permission: CompanyAndMarket, menuItems: [
        {
          href: "country-group", title: "Country-Group", permission: CompanyAndMarket_CountryGroup, component: CountryGroupComponent,
          active: false
        },
        {
          href: "countries", title: "Countries", permission: CompanyAndMarket_Country, component: CountriesComponent,
          active: false
        },
        {
          href: "country-profile-admin", title: "Country Profile (Admin)", permission: Application_GbFacts, component: CountryProfileAdminComponent,
          active: false
        },
        {
          href: "country-profile", title: "Country Profile", permission: CompanyAndMarket_CountryProfile, component: CountryProfileComponent,
          active: false
        },
        {
          href: "market-sector", title: "Market-Sector", permission: CompanyAndMarket_MarketSector, component: MarketSectorComponent,
          active: false
        },
        {
          href: "currency-exchange", title: "Currency Exchange", permission: CompanyAndMarket_CurrencyExchange, component: CurrencyExchangeComponent,
          active: false
        },
      ],
      active: false
    },
    {
      title: "Companies", permission: Company, menuItems: [
        {
          href: "companies", title: "Companies", permission: Company_Company, component: CompaniesComponent,
          active: false
        },
        {
          href: "management", title: "Management", permission: Company_Management, component: ManagementComponent,
          active: false
        },
        {
          href: "ownership-companies", title: "Ownership (Companies)", permission: Company_Ownership, component: OwnershipCompaniesComponent,
          active: false
        },
        {
          href: "announcements", title: "Announcements", permission: Company_Announcements, component: AnnouncementsComponent,
          active: false
        },
        {
          href: "mutaul-funds", title: "Mutual Funds", permission: Company_MutaulFunds, component: MutaulFundsComponent,
          active: false
        },
        {
          href: "mutaul-funds-settings", title: "Mutual Funds Settings", permission: Company_MutaulFundsSettings, component: MutaulFundsSettingsComponent,
          active: false
        },
        {
          href: "ipos", title: "IPOs", permission: Company_Ipos, component: IposComponent,
          active: false
        },
        {
          href: "accounts", title: "Accounts", permission: Company_Accounts, component: AccountsComponent,
          active: false
        },
        {
          href: "accounts-custom-order", title: "Accounts Custom Order", permission: Company_AccountsCustomOrder, component: AccountsCustomOrderComponent,
          active: false
        },
        // { href:"segment-accounts", title:"Segment Accounts" , permission:Application_GbFacts, component:SegmentAccountsComponent },
        {
          href: "update-ownership-facts", title: "Update Ownership Facts", permission: Company_UpdateOwnershipFacts, component: UpdateOwnershipFactsComponent,
          active: false
        },
        {
          href: "estimates-and-forecasts", title: "Estimates and Forecasts", permission: Company_EstimatesAndForecasts, component: EstimatesAndForecastsComponent,
          active: false
        },
        {
          href: "companies-products-services-raw-materials-updates", title: "Companies Products Services Raw Materials Updates", permission: Company_CompaniesProductsServicesRawMaterialsUpdates, component: CompaniesProductsServicesRawMaterialsUpdatesComponent,
          active: false
        },
        {
          href: "country-accounts", title: "Country Accounts", permission: Company_CountryAccounts, component: CountryAccountsComponent,
          active: false
        },
        {
          href: "country-accounts-facts-order", title: "Country Accounts Facts Order", permission: Company_CountryAccountsFactsOrder, component: CountryAccountsFactsOrderComponent,
          active: false
        },
        {
          href: "agencies-rating", title: "Agencies Rating", permission: Company_AgenciesRating, component: AgenciesRatingComponent,
          active: false
        },
        {
          href: "companies-agencies-and-ratings", title: "Companies Agencies and Ratings", permission: Company_CompaniesAgenciesAndRatings, component: CompaniesAgenciesAndRatingsComponent,
          active: false
        },
      ],
      active: false
    },
    {
      title: "News", permission: News, menuItems: [
        // {
        //   href: "economic-and-business", title: "Economic & Business", permission: News_EconomicAndBusiness, component: EconomicAndBusinessComponent,
        //   active: false
        // },
        // {
        //   href: "market", title: "Market", permission: News_Market, component: MarketComponent,
        //   active: false
        // },
        // {
        //   href: "company", title: "Company", permission: News_Gulfbase, component: CompanyComponent,
        //   active: false
        // },
        // {
        //   href: "gulfbase", title: "Gulfbase", permission: News_Gulfbase, component: GulfbaseComponent,
        //   active: false
        // },
        {
          href: "english", title: "English", permission: News_English, component: EnglishComponent,
          active: false
        },
        {
          href: "arabic", title: "Arabic", permission: News_Arabic, component: ArabicComponent,
          active: false
        },
      ],
      active: false
    },
    {
      title: "Prices & Indices", permission: PriceAndIndices, menuItems: [
        {
          href: "end-of-day", title: "End Of Day", permission: PriceAndIndices_EndOfDay, component: EndOfDayComponent,
          active: false
        },
        {
          href: "intra-day", title: "Intra Day", permission: PriceAndIndices_IntraDay, component: IntraDayComponent,
          active: false
        },
        {
          href: "official", title: "Official", permission: PriceAndIndices_Official, component: OfficialComponent,
          active: false
        },
        {
          href: "gulfbase-price", title: "Gulfbase (Price)", permission: PriceAndIndices_GulfbasePrice, component: GulfbasePriceComponent,
          active: false
        },
        {
          href: "global-indices", title: "Global Indices", permission: PriceAndIndices_GlobalIndices, component: GlobalIndicesComponent,
          active: false
        },
        {
          href: "fund-prices", title: "Fund Prices", permission: PriceAndIndices_FundPrices, component: FundPricesComponent,
          active: false
        },
      ],
      active: false
    },
    {
      title: "Financials", permission: Financial, menuItems: [
        {
          href: "upload", title: "Upload", permission: Financial_Upload, component: UploadComponent,
          active: false
        },
        {
          href: "entry", title: "Entry", permission: Financial_Entry, component: EntryComponent,
          active: false
        },
        // {
        //   href: "re-entry", title: "Re Entry", permission: Financial_ReEntry, component: ReEntryComponent,
        //   active: false
        // },
        // {
        //   href: "reviewer", title: "Reviewer", permission: Financial_Reviewer, component: ReviewerComponent,
        //   active: false
        // },
        {
          href: "reviewer-news", title: "Reviewer (New)", permission: Financial_ReviewerNew, component: ReviewerNewComponent,
          active: false
        },
        {
          href: "current-values", title: "Current Values", permission: Financial_CurrentValues, component: CurrentValuesComponent,
          active: false
        },
        {
          href: "financials-admin", title: "Financials (Admim)", permission: Financial_FinancialsAdmin, component: FinancialsAdminComponent,
          active: false
        },
        {
          href: "comp-qnet-p", title: "CompQnetP", permission: Financial_CompQnetP, component: CompQnetPComponent,
          active: false
        },
        {
          href: "qnet-profit-report", title: "QNet Profit Report", permission: Financial_QnetProfitReport, component: QnetProfitReportComponent,
          active: false
        },
        {
          href: "current-dividends", title: "Current Dividends", permission: Financial_CurrentDividends, component: CurrentDividendsComponent,
          active: false
        },
        {
          href: "enhanced-ratios", title: "Enhanced Ratios", permission: Financial_EnhancedRatios, component: EnhancedRatiosComponent,
          active: false
        },
        {
          href: "historical-cash-dividends", title: "Historical Cash Dividends", permission: Financial_HistoricalCashDividends, component: HistoricalCashDividendsComponent,
          active: false
        },
        {
          href: "upload-indicators-batch", title: "Upload Indicators Batch", permission: Financial_UploadIndicatorsBatch, component: UploadIndicatorsBatchComponent,
          active: false
        },
        {
          href: "batches-entry", title: "Batches Entry", permission: Financial_BatchesEntry, component: BatchesEntryComponent,
          active: false
        },
        {
          href: "batches-re-entry", title: "Batches ReEntry", permission: Financial_BatchesReEntry, component: BatchesReEntryComponent,
          active: false
        },
        {
          href: "batches-admin", title: "Batches (Admin)", permission: Financial_BatchesAdmin, component: BatchesAdminComponent,
          active: false
        },
      ],
      active: false
    }


  ]
  this.menusSubject.next(this.menu);
}

}
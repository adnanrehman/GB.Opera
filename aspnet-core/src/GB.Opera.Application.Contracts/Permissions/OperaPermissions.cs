using GB.Opera.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace GB.Opera.Permissions;

public class OperaPermissions : PermissionDefinitionProvider
{
    public const string Application = "Application";
    public const string Application_GbFacts = Application + ".GbFacts";
    public const string Application_AccountsClassification = Application + ".AccountsClassification";
    public const string Application_Ownership = Application + ".Ownership";
    public const string Application_Reports = Application + ".Reports";
    public const string Application_LhscUpload = Application + ".LhscUpload";
    public const string Application_Gbir = Application + ".Gbir";
    public const string Application_GbUniversalFacts = Application + ".GbUniversalFacts";
    public const string Application_ProductsServicesAndRawMaterials = Application + ".ProductsServicesAndRawMaterials";
    public const string Application_EconomicAndStatisticalData = Application + ".EconomicAndStatisticalData";
    public const string Application_GulfBaseVideo = Application + ".GulfBaseVideo";

    public const string CompanyAndMarket = "CompanyAndMarket";
    public const string CompanyAndMarket_CountryGroup = CompanyAndMarket + ".CountryGroup";
    public const string CompanyAndMarket_Country = CompanyAndMarket + ".Country";
    public const string CompanyAndMarket_CountryProfile = CompanyAndMarket + ".CountryProfile";
    public const string CompanyAndMarket_MarketSector = CompanyAndMarket + ".MarketSector";
    public const string CompanyAndMarket_CurrencyExchange = CompanyAndMarket + ".CurrencyExchange";

    public const string Company = "Company";
    public const string Company_Company = Company + ".Company";
    public const string Company_Management = Company + ".Management";
    public const string Company_Ownership = Company + ".Ownership";
    public const string Company_Announcements = Company + ".Announcements";
    public const string Company_MutaulFunds = Company + ".MutaulFunds";
    public const string Company_MutaulFundsSettings = Company + ".MutaulFundsSettings";
    public const string Company_Ipos = Company + ".Ipos";
    public const string Company_Accounts = Company + ".Accounts";
    public const string Company_AccountsCustomOrder = Company + ".AccountsCustomOrder";
    public const string Company_UpdateOwnershipFacts = Company + ".UpdateOwnershipFacts";
    public const string Company_EstimatesAndForecasts = Company + ".EstimatesAndForecasts";
    public const string Company_CompaniesProductsServicesRawMaterialsUpdates = Company + ".CompaniesProductsServicesRawMaterialsUpdates";
    public const string Company_CountryAccounts = Company + ".CountryAccounts";
    public const string Company_CountryAccountsFactsOrder = Company + ".CountryAccountsFactsOrder";
    public const string Company_AgenciesRating = Company + ".AgenciesRating";
    public const string Company_CompaniesAgenciesAndRatings = Company + ".CompaniesAgenciesAndRatings";

    public const string News = "News";
    public const string News_EconomicAndBusiness = News + ".EconomicAndBusiness";
    public const string News_Market = News + ".Market";
    public const string News_Gulfbase = News + ".Gulfbase";
    public const string News_English = News + ".English";
    public const string News_Arabic = News + ".Arabic";

    public const string News_Source = News + ".News Source";

    public const string PriceAndIndices = "PriceAndIndices";
    public const string PriceAndIndices_EndOfDay = PriceAndIndices + ".EndOfDay";
    public const string PriceAndIndices_IntraDay = PriceAndIndices + ".IntraDay";
    public const string PriceAndIndices_Official = PriceAndIndices + ".Official";
    public const string PriceAndIndices_GulfbasePrice = PriceAndIndices + ".GulfbasePrice";
    public const string PriceAndIndices_GlobalIndices = PriceAndIndices + ".GlobalIndices";
    public const string PriceAndIndices_FundPrices = PriceAndIndices + ".FundPrices";

    public const string Financial = "Financial";
    public const string Financial_Upload = Financial + ".Upload";
    public const string Financial_Entry = Financial + ".Entry";
    public const string Financial_ReEntry = Financial + ".ReEntry";
    public const string Financial_Reviewer = Financial + ".Reviewer";
    public const string Financial_ReviewerNew = Financial + ".ReviewerNew";
    public const string Financial_CurrentValues = Financial + ".CurrentValues";
    public const string Financial_FinancialsAdmin = Financial + ".FinancialsAdmin";
    public const string Financial_CompQnetP = Financial + ".CompQnetP";
    public const string Financial_QnetProfitReport = Financial + ".QnetProfitReport";
    public const string Financial_CurrentDividends = Financial + ".CurrentDividends";
    public const string Financial_EnhancedRatios = Financial + ".EnhancedRatios";
    public const string Financial_HistoricalCashDividends = Financial + ".HistoricalCashDividends";
    public const string Financial_UploadIndicatorsBatch = Financial + ".UploadIndicatorsBatch";
    public const string Financial_BatchesEntry = Financial + ".BatchesEntry";
    public const string Financial_BatchesReEntry = Financial + ".BatchesReEntry";
    public const string Financial_BatchesAdmin = Financial + ".BatchesAdmin";


    public override void Define(IPermissionDefinitionContext context)
    {
        //var company = context.AddGroup(Opera_Company, LocalizableString.Create<OperaResource>("Permission:Company"));
    }
}

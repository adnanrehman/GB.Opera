using GB.Opera.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace GB.Opera.Permissions;

public class OperaPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {

        #region Application

        var application = context.AddGroup(OperaPermissions.Application);
        application.AddPermission(OperaPermissions.Application, L("Application"));

        var application_GbFacts = application.AddPermission(OperaPermissions.Application_GbFacts, L("GbFacts"));
        application_GbFacts.AddChild(OperaPermissions.Application_GbFacts + ".Create", L("Create"));
        application_GbFacts.AddChild(OperaPermissions.Application_GbFacts + ".Edit", L("Edit"));
        application_GbFacts.AddChild(OperaPermissions.Application_GbFacts + ".Delete", L("Delete"));

        var application_AccountsClassification = application.AddPermission(OperaPermissions.Application_AccountsClassification, L("AccountsClassification"));
        application_AccountsClassification.AddChild(OperaPermissions.Application_AccountsClassification + ".Create", L("Create"));
        application_AccountsClassification.AddChild(OperaPermissions.Application_AccountsClassification + ".Edit", L("Edit"));
        application_AccountsClassification.AddChild(OperaPermissions.Application_AccountsClassification + ".Delete", L("Delete"));

        var application_Ownership = application.AddPermission(OperaPermissions.Application_Ownership, L("Ownership"));
        application_Ownership.AddChild(OperaPermissions.Application_Ownership + ".Create", L("Create"));
        application_Ownership.AddChild(OperaPermissions.Application_Ownership + ".Edit", L("Edit"));
        application_Ownership.AddChild(OperaPermissions.Application_Ownership + ".Delete", L("Delete"));

        var application_Reports = application.AddPermission(OperaPermissions.Application_Reports, L("Reports"));
        application_Reports.AddChild(OperaPermissions.Application_Reports + ".Create", L("Create"));
        application_Reports.AddChild(OperaPermissions.Application_Reports + ".Edit", L("Edit"));
        application_Reports.AddChild(OperaPermissions.Application_Reports + ".Delete", L("Delete"));

        var application_LhscUpload = application.AddPermission(OperaPermissions.Application_LhscUpload, L("LhscUpload"));
        application_LhscUpload.AddChild(OperaPermissions.Application_LhscUpload + ".Create", L("Create"));
        application_LhscUpload.AddChild(OperaPermissions.Application_LhscUpload + ".Edit", L("Edit"));
        application_LhscUpload.AddChild(OperaPermissions.Application_LhscUpload + ".Delete", L("Delete"));

        var application_Gbir = application.AddPermission(OperaPermissions.Application_Gbir, L("Gbir"));
        application_Gbir.AddChild(OperaPermissions.Application_Gbir + ".Create", L("Create"));
        application_Gbir.AddChild(OperaPermissions.Application_Gbir + ".Edit", L("Edit"));
        application_Gbir.AddChild(OperaPermissions.Application_Gbir + ".Delete", L("Delete"));

        var application_GbUniversalFacts = application.AddPermission(OperaPermissions.Application_GbUniversalFacts, L("GbUniversalFacts"));
        application_GbUniversalFacts.AddChild(OperaPermissions.Application_GbUniversalFacts + ".Create", L("Create"));
        application_GbUniversalFacts.AddChild(OperaPermissions.Application_GbUniversalFacts + ".Edit", L("Edit"));
        application_GbUniversalFacts.AddChild(OperaPermissions.Application_GbUniversalFacts + ".Delete", L("Delete"));

        var application_ProductsServicesAndRawMaterials = application.AddPermission(OperaPermissions.Application_ProductsServicesAndRawMaterials, L("ProductsServicesAndRawMaterials"));
        application_ProductsServicesAndRawMaterials.AddChild(OperaPermissions.Application_ProductsServicesAndRawMaterials + ".Create", L("Create"));
        application_ProductsServicesAndRawMaterials.AddChild(OperaPermissions.Application_ProductsServicesAndRawMaterials + ".Edit", L("Edit"));
        application_ProductsServicesAndRawMaterials.AddChild(OperaPermissions.Application_ProductsServicesAndRawMaterials + ".Delete", L("Delete"));

        var application_EconomicAndStatisticalData = application.AddPermission(OperaPermissions.Application_EconomicAndStatisticalData, L("EconomicAndStatisticalData"));
        application_EconomicAndStatisticalData.AddChild(OperaPermissions.Application_EconomicAndStatisticalData + ".Create", L("Create"));
        application_EconomicAndStatisticalData.AddChild(OperaPermissions.Application_EconomicAndStatisticalData + ".Edit", L("Edit"));
        application_EconomicAndStatisticalData.AddChild(OperaPermissions.Application_EconomicAndStatisticalData + ".Delete", L("Delete"));

        var application_GulfBaseVideo = application.AddPermission(OperaPermissions.Application_GulfBaseVideo, L("GulfBaseVideo"));
        application_GulfBaseVideo.AddChild(OperaPermissions.Application_GulfBaseVideo + ".Create", L("Create"));
        application_GulfBaseVideo.AddChild(OperaPermissions.Application_GulfBaseVideo + ".Edit", L("Edit"));
        application_GulfBaseVideo.AddChild(OperaPermissions.Application_GulfBaseVideo + ".Delete", L("Delete"));

        #endregion

        #region CompanyAndMarket

        var companyAndMarket = context.AddGroup(OperaPermissions.CompanyAndMarket);
        companyAndMarket.AddPermission(OperaPermissions.CompanyAndMarket, L("CompanyAndMarket"));
        var companyAndMarket_CountryGroup = companyAndMarket.AddPermission(OperaPermissions.CompanyAndMarket_CountryGroup, L("CountryGroup"));
        companyAndMarket_CountryGroup.AddChild(OperaPermissions.CompanyAndMarket_CountryGroup + ".Create", L("Create"));
        companyAndMarket_CountryGroup.AddChild(OperaPermissions.CompanyAndMarket_CountryGroup + ".Edit", L("Edit"));
        companyAndMarket_CountryGroup.AddChild(OperaPermissions.CompanyAndMarket_CountryGroup + ".Delete", L("Delete"));

        var companyAndMarket_Country = companyAndMarket.AddPermission(OperaPermissions.CompanyAndMarket_Country, L("Country"));
        companyAndMarket_Country.AddChild(OperaPermissions.CompanyAndMarket_Country + ".Create", L("Create"));
        companyAndMarket_Country.AddChild(OperaPermissions.CompanyAndMarket_Country + ".Edit", L("Edit"));
        companyAndMarket_Country.AddChild(OperaPermissions.CompanyAndMarket_Country + ".Delete", L("Delete"));

        var companyAndMarket_CountryProfile = companyAndMarket.AddPermission(OperaPermissions.CompanyAndMarket_CountryProfile, L("CountryProfile"));
        companyAndMarket_CountryProfile.AddChild(OperaPermissions.CompanyAndMarket_CountryProfile + ".Create", L("Create"));
        companyAndMarket_CountryProfile.AddChild(OperaPermissions.CompanyAndMarket_CountryProfile + ".Edit", L("Edit"));
        companyAndMarket_CountryProfile.AddChild(OperaPermissions.CompanyAndMarket_CountryProfile + ".Delete", L("Delete"));

        var companyAndMarket_MarketSector = companyAndMarket.AddPermission(OperaPermissions.CompanyAndMarket_MarketSector, L("MarketSector"));
        companyAndMarket_MarketSector.AddChild(OperaPermissions.CompanyAndMarket_MarketSector + ".Create", L("Create"));
        companyAndMarket_MarketSector.AddChild(OperaPermissions.CompanyAndMarket_MarketSector + ".Edit", L("Edit"));
        companyAndMarket_MarketSector.AddChild(OperaPermissions.CompanyAndMarket_MarketSector + ".Delete", L("Delete"));

        var companyAndMarket_CurrencyExchange = companyAndMarket.AddPermission(OperaPermissions.CompanyAndMarket_CurrencyExchange, L("CurrencyExchange"));
        companyAndMarket_CurrencyExchange.AddChild(OperaPermissions.CompanyAndMarket_CurrencyExchange + ".Create", L("Create"));
        companyAndMarket_CurrencyExchange.AddChild(OperaPermissions.CompanyAndMarket_CurrencyExchange + ".Edit", L("Edit"));
        companyAndMarket_CurrencyExchange.AddChild(OperaPermissions.CompanyAndMarket_CurrencyExchange + ".Delete", L("Delete"));

        #endregion

        #region Company

        var company = context.AddGroup(OperaPermissions.Company);
        company.AddPermission(OperaPermissions.Company, L("Company"));
        var company_Company = company.AddPermission(OperaPermissions.Company_Company, L("Company"));
        company_Company.AddChild(OperaPermissions.Company_Company + ".Create", L("Create"));
        company_Company.AddChild(OperaPermissions.Company_Company + ".Edit", L("Edit"));
        company_Company.AddChild(OperaPermissions.Company_Company + ".Delete", L("Delete"));

        var company_Management = company.AddPermission(OperaPermissions.Company_Management, L("Management"));
        company_Management.AddChild(OperaPermissions.Company_Management + ".Create", L("Create"));
        company_Management.AddChild(OperaPermissions.Company_Management + ".Edit", L("Edit"));
        company_Management.AddChild(OperaPermissions.Company_Management + ".Delete", L("Delete"));

        var company_Ownership = company.AddPermission(OperaPermissions.Company_Ownership, L("Ownership"));
        company_Ownership.AddChild(OperaPermissions.Company_Ownership + ".Create", L("Create"));
        company_Ownership.AddChild(OperaPermissions.Company_Ownership + ".Edit", L("Edit"));
        company_Ownership.AddChild(OperaPermissions.Company_Ownership + ".Delete", L("Delete"));

        var company_Announcements = company.AddPermission(OperaPermissions.Company_Announcements, L("Announcements"));
        company_Announcements.AddChild(OperaPermissions.Company_Announcements + ".Create", L("Create"));
        company_Announcements.AddChild(OperaPermissions.Company_Announcements + ".Edit", L("Edit"));
        company_Announcements.AddChild(OperaPermissions.Company_Announcements + ".Delete", L("Delete"));

        var company_MutaulFunds = company.AddPermission(OperaPermissions.Company_MutaulFunds, L("MutaulFunds"));
        company_MutaulFunds.AddChild(OperaPermissions.Company_MutaulFunds + ".Create", L("Create"));
        company_MutaulFunds.AddChild(OperaPermissions.Company_MutaulFunds + ".Edit", L("Edit"));
        company_MutaulFunds.AddChild(OperaPermissions.Company_MutaulFunds + ".Delete", L("Delete"));

        var company_MutaulFundsSettings = company.AddPermission(OperaPermissions.Company_MutaulFundsSettings, L("MutaulFundsSettings"));
        company_MutaulFundsSettings.AddChild(OperaPermissions.Company_MutaulFundsSettings + ".Create", L("Create"));
        company_MutaulFundsSettings.AddChild(OperaPermissions.Company_MutaulFundsSettings + ".Edit", L("Edit"));
        company_MutaulFundsSettings.AddChild(OperaPermissions.Company_MutaulFundsSettings + ".Delete", L("Delete"));

        var company_Ipos = company.AddPermission(OperaPermissions.Company_Ipos, L("Ipos"));
        company_Ipos.AddChild(OperaPermissions.Company_Ipos + ".Create", L("Create"));
        company_Ipos.AddChild(OperaPermissions.Company_Ipos + ".Edit", L("Edit"));
        company_Ipos.AddChild(OperaPermissions.Company_Ipos + ".Delete", L("Delete"));

        var company_Accounts = company.AddPermission(OperaPermissions.Company_Accounts, L("Accounts"));
        company_Accounts.AddChild(OperaPermissions.Company_Accounts + ".Create", L("Create"));
        company_Accounts.AddChild(OperaPermissions.Company_Accounts + ".Edit", L("Edit"));
        company_Accounts.AddChild(OperaPermissions.Company_Accounts + ".Delete", L("Delete"));

        var company_AccountsCustomOrder = company.AddPermission(OperaPermissions.Company_AccountsCustomOrder, L("AccountsCustomOrder"));
        company_AccountsCustomOrder.AddChild(OperaPermissions.Company_AccountsCustomOrder + ".Create", L("Create"));
        company_AccountsCustomOrder.AddChild(OperaPermissions.Company_AccountsCustomOrder + ".Edit", L("Edit"));
        company_AccountsCustomOrder.AddChild(OperaPermissions.Company_AccountsCustomOrder + ".Delete", L("Delete"));

        var company_UpdateOwnershipFacts = company.AddPermission(OperaPermissions.Company_UpdateOwnershipFacts, L("UpdateOwnershipFacts"));
        company_UpdateOwnershipFacts.AddChild(OperaPermissions.Company_UpdateOwnershipFacts + ".Create", L("Create"));
        company_UpdateOwnershipFacts.AddChild(OperaPermissions.Company_UpdateOwnershipFacts + ".Edit", L("Edit"));
        company_UpdateOwnershipFacts.AddChild(OperaPermissions.Company_UpdateOwnershipFacts + ".Delete", L("Delete"));

        var company_EstimatesAndForecasts = company.AddPermission(OperaPermissions.Company_EstimatesAndForecasts, L("EstimatesAndForecasts"));
        company_EstimatesAndForecasts.AddChild(OperaPermissions.Company_EstimatesAndForecasts + ".Create", L("Create"));
        company_EstimatesAndForecasts.AddChild(OperaPermissions.Company_EstimatesAndForecasts + ".Edit", L("Edit"));
        company_EstimatesAndForecasts.AddChild(OperaPermissions.Company_EstimatesAndForecasts + ".Delete", L("Delete"));

        var company_CompaniesProductsServicesRawMaterialsUpdates = company.AddPermission(OperaPermissions.Company_CompaniesProductsServicesRawMaterialsUpdates, L("CompaniesProductsServicesRawMaterialsUpdates"));
        company_CompaniesProductsServicesRawMaterialsUpdates.AddChild(OperaPermissions.Company_CompaniesProductsServicesRawMaterialsUpdates + ".Create", L("Create"));
        company_CompaniesProductsServicesRawMaterialsUpdates.AddChild(OperaPermissions.Company_CompaniesProductsServicesRawMaterialsUpdates + ".Edit", L("Edit"));
        company_CompaniesProductsServicesRawMaterialsUpdates.AddChild(OperaPermissions.Company_CompaniesProductsServicesRawMaterialsUpdates + ".Delete", L("Delete"));

        var company_CountryAccounts = company.AddPermission(OperaPermissions.Company_CountryAccounts, L("CountryAccounts"));
        company_CountryAccounts.AddChild(OperaPermissions.Company_CountryAccounts + ".Create", L("Create"));
        company_CountryAccounts.AddChild(OperaPermissions.Company_CountryAccounts + ".Edit", L("Edit"));
        company_CountryAccounts.AddChild(OperaPermissions.Company_CountryAccounts + ".Delete", L("Delete"));

        var company_CountryAccountsFactsOrder = company.AddPermission(OperaPermissions.Company_CountryAccountsFactsOrder, L("CountryAccountsFactsOrder"));
        company_CountryAccountsFactsOrder.AddChild(OperaPermissions.Company_CountryAccountsFactsOrder + ".Create", L("Create"));
        company_CountryAccountsFactsOrder.AddChild(OperaPermissions.Company_CountryAccountsFactsOrder + ".Edit", L("Edit"));
        company_CountryAccountsFactsOrder.AddChild(OperaPermissions.Company_CountryAccountsFactsOrder + ".Delete", L("Delete"));

        var company_AgenciesRating = company.AddPermission(OperaPermissions.Company_AgenciesRating, L("AgenciesRating"));
        company_AgenciesRating.AddChild(OperaPermissions.Company_AgenciesRating + ".Create", L("Create"));
        company_AgenciesRating.AddChild(OperaPermissions.Company_AgenciesRating + ".Edit", L("Edit"));
        company_AgenciesRating.AddChild(OperaPermissions.Company_AgenciesRating + ".Delete", L("Delete"));

        var company_CompaniesAgenciesAndRatings = company.AddPermission(OperaPermissions.Company_CompaniesAgenciesAndRatings, L("CompaniesAgenciesAndRatings"));
        company_CompaniesAgenciesAndRatings.AddChild(OperaPermissions.Company_CompaniesAgenciesAndRatings + ".Create", L("Create"));
        company_CompaniesAgenciesAndRatings.AddChild(OperaPermissions.Company_CompaniesAgenciesAndRatings + ".Edit", L("Edit"));
        company_CompaniesAgenciesAndRatings.AddChild(OperaPermissions.Company_CompaniesAgenciesAndRatings + ".Delete", L("Delete"));

        #endregion

        #region News

        var news = context.AddGroup(OperaPermissions.News);
        news.AddPermission(OperaPermissions.News, L("News"));
        var news_EconomicAndBusiness = news.AddPermission(OperaPermissions.News_EconomicAndBusiness, L("EconomicAndBusiness"));
        news_EconomicAndBusiness.AddChild(OperaPermissions.News_EconomicAndBusiness + ".Create", L("Create"));
        news_EconomicAndBusiness.AddChild(OperaPermissions.News_EconomicAndBusiness + ".Edit", L("Edit"));
        news_EconomicAndBusiness.AddChild(OperaPermissions.News_EconomicAndBusiness + ".Delete", L("Delete"));

        var news_Market = news.AddPermission(OperaPermissions.News_Market, L("Market"));
        news_Market.AddChild(OperaPermissions.News_Market + ".Create", L("Create"));
        news_Market.AddChild(OperaPermissions.News_Market + ".Edit", L("Edit"));
        news_Market.AddChild(OperaPermissions.News_Market + ".Delete", L("Delete"));

        var news_Gulfbase = news.AddPermission(OperaPermissions.News_Gulfbase, L("Gulfbase"));
        news_Gulfbase.AddChild(OperaPermissions.News_Gulfbase + ".Create", L("Create"));
        news_Gulfbase.AddChild(OperaPermissions.News_Gulfbase + ".Edit", L("Edit"));
        news_Gulfbase.AddChild(OperaPermissions.News_Gulfbase + ".Delete", L("Delete"));

        var news_English = news.AddPermission(OperaPermissions.News_English, L("English"));
        news_English.AddChild(OperaPermissions.News_English + ".Create", L("Create"));
        news_English.AddChild(OperaPermissions.News_English + ".Edit", L("Edit"));
        news_English.AddChild(OperaPermissions.News_English + ".Delete", L("Delete"));
        news_English.AddChild(OperaPermissions.News_English + ".Approved", L("Approved"));

        var news_Arabic = news.AddPermission(OperaPermissions.News_Arabic, L("Arabic"));
        news_Arabic.AddChild(OperaPermissions.News_Arabic + ".Create", L("Create"));
        news_Arabic.AddChild(OperaPermissions.News_Arabic + ".Edit", L("Edit"));
        news_Arabic.AddChild(OperaPermissions.News_Arabic + ".Delete", L("Delete"));
        news_Arabic.AddChild(OperaPermissions.News_Arabic + ".Approved", L("Approved"));


        var news_Source = news.AddPermission(OperaPermissions.News_Source, L("News Source"));
        news_Source.AddChild(OperaPermissions.News_Source + ".Create", L("Create"));
        news_Source.AddChild(OperaPermissions.News_Source + ".Edit", L("Edit"));
        news_Source.AddChild(OperaPermissions.News_Source + ".Delete", L("Delete"));

        #endregion

        #region PriceAndIndices

        var priceAndIndices = context.AddGroup(OperaPermissions.PriceAndIndices);
        priceAndIndices.AddPermission(OperaPermissions.PriceAndIndices, L("PriceAndIndices"));
        var priceAndIndices_EndOfDay = priceAndIndices.AddPermission(OperaPermissions.PriceAndIndices_EndOfDay, L("EndOfDay"));
        priceAndIndices_EndOfDay.AddChild(OperaPermissions.PriceAndIndices_EndOfDay + ".Create", L("Create"));
        priceAndIndices_EndOfDay.AddChild(OperaPermissions.PriceAndIndices_EndOfDay + ".Edit", L("Edit"));
        priceAndIndices_EndOfDay.AddChild(OperaPermissions.PriceAndIndices_EndOfDay + ".Delete", L("Delete"));

        var priceAndIndices_IntraDay = priceAndIndices.AddPermission(OperaPermissions.PriceAndIndices_IntraDay, L("IntraDay"));
        priceAndIndices_IntraDay.AddChild(OperaPermissions.PriceAndIndices_IntraDay + ".Create", L("Create"));
        priceAndIndices_IntraDay.AddChild(OperaPermissions.PriceAndIndices_IntraDay + ".Edit", L("Edit"));
        priceAndIndices_IntraDay.AddChild(OperaPermissions.PriceAndIndices_IntraDay + ".Delete", L("Delete"));

        var priceAndIndices_Official = priceAndIndices.AddPermission(OperaPermissions.PriceAndIndices_Official, L("Official"));
        priceAndIndices_Official.AddChild(OperaPermissions.PriceAndIndices_Official + ".Create", L("Create"));
        priceAndIndices_Official.AddChild(OperaPermissions.PriceAndIndices_Official + ".Edit", L("Edit"));
        priceAndIndices_Official.AddChild(OperaPermissions.PriceAndIndices_Official + ".Delete", L("Delete"));

        var priceAndIndices_GulfbasePrice = priceAndIndices.AddPermission(OperaPermissions.PriceAndIndices_GulfbasePrice, L("GulfbasePrice"));
        priceAndIndices_GulfbasePrice.AddChild(OperaPermissions.PriceAndIndices_GulfbasePrice + ".Create", L("Create"));
        priceAndIndices_GulfbasePrice.AddChild(OperaPermissions.PriceAndIndices_GulfbasePrice + ".Edit", L("Edit"));
        priceAndIndices_GulfbasePrice.AddChild(OperaPermissions.PriceAndIndices_GulfbasePrice + ".Delete", L("Delete"));

        var priceAndIndices_GlobalIndices = priceAndIndices.AddPermission(OperaPermissions.PriceAndIndices_GlobalIndices, L("GlobalIndices"));
        priceAndIndices_GlobalIndices.AddChild(OperaPermissions.PriceAndIndices_GlobalIndices + ".Create", L("Create"));
        priceAndIndices_GlobalIndices.AddChild(OperaPermissions.PriceAndIndices_GlobalIndices + ".Edit", L("Edit"));
        priceAndIndices_GlobalIndices.AddChild(OperaPermissions.PriceAndIndices_GlobalIndices + ".Delete", L("Delete"));

        var priceAndIndices_FundPrices = priceAndIndices.AddPermission(OperaPermissions.PriceAndIndices_FundPrices, L("FundPrices"));
        priceAndIndices_FundPrices.AddChild(OperaPermissions.PriceAndIndices_FundPrices + ".Create", L("Create"));
        priceAndIndices_FundPrices.AddChild(OperaPermissions.PriceAndIndices_FundPrices + ".Edit", L("Edit"));
        priceAndIndices_FundPrices.AddChild(OperaPermissions.PriceAndIndices_FundPrices + ".Delete", L("Delete"));

        #endregion

        #region Financial

        var financial = context.AddGroup(OperaPermissions.Financial);
        financial.AddPermission(OperaPermissions.Financial, L("Financial"));
        var financial_Upload = financial.AddPermission(OperaPermissions.Financial_Upload, L("Upload"));
        financial_Upload.AddChild(OperaPermissions.Financial_Upload + ".Create", L("Create"));
        financial_Upload.AddChild(OperaPermissions.Financial_Upload + ".Edit", L("Edit"));
        financial_Upload.AddChild(OperaPermissions.Financial_Upload + ".Delete", L("Delete"));

        var financial_Entry = financial.AddPermission(OperaPermissions.Financial_Entry, L("Entry"));
        financial_Entry.AddChild(OperaPermissions.Financial_Entry + ".Create", L("Create"));
        financial_Entry.AddChild(OperaPermissions.Financial_Entry + ".Edit", L("Edit"));
        financial_Entry.AddChild(OperaPermissions.Financial_Entry + ".Delete", L("Delete"));

        var financial_ReEntry = financial.AddPermission(OperaPermissions.Financial_ReEntry, L("ReEntry"));
        financial_ReEntry.AddChild(OperaPermissions.Financial_ReEntry + ".Create", L("Create"));
        financial_ReEntry.AddChild(OperaPermissions.Financial_ReEntry + ".Edit", L("Edit"));
        financial_ReEntry.AddChild(OperaPermissions.Financial_ReEntry + ".Delete", L("Delete"));

        var financial_Reviewer = financial.AddPermission(OperaPermissions.Financial_Reviewer, L("Reviewer"));
        financial_Reviewer.AddChild(OperaPermissions.Financial_Reviewer + ".Create", L("Create"));
        financial_Reviewer.AddChild(OperaPermissions.Financial_Reviewer + ".Edit", L("Edit"));
        financial_Reviewer.AddChild(OperaPermissions.Financial_Reviewer + ".Delete", L("Delete"));

        var financial_ReviewerNew = financial.AddPermission(OperaPermissions.Financial_ReviewerNew, L("ReviewerNew"));
        financial_ReviewerNew.AddChild(OperaPermissions.Financial_ReviewerNew + ".Create", L("Create"));
        financial_ReviewerNew.AddChild(OperaPermissions.Financial_ReviewerNew + ".Edit", L("Edit"));
        financial_ReviewerNew.AddChild(OperaPermissions.Financial_ReviewerNew + ".Delete", L("Delete"));

        var financial_CurrentValues = financial.AddPermission(OperaPermissions.Financial_CurrentValues, L("CurrentValues"));
        financial_CurrentValues.AddChild(OperaPermissions.Financial_CurrentValues + ".Create", L("Create"));
        financial_CurrentValues.AddChild(OperaPermissions.Financial_CurrentValues + ".Edit", L("Edit"));
        financial_CurrentValues.AddChild(OperaPermissions.Financial_CurrentValues + ".Delete", L("Delete"));

        var financial_FinancialsAdmin = financial.AddPermission(OperaPermissions.Financial_FinancialsAdmin, L("FinancialsAdmin"));
        financial_FinancialsAdmin.AddChild(OperaPermissions.Financial_FinancialsAdmin + ".Create", L("Create"));
        financial_FinancialsAdmin.AddChild(OperaPermissions.Financial_FinancialsAdmin + ".Edit", L("Edit"));
        financial_FinancialsAdmin.AddChild(OperaPermissions.Financial_FinancialsAdmin + ".Delete", L("Delete"));

        var financial_CompQnetP = financial.AddPermission(OperaPermissions.Financial_CompQnetP, L("CompQnetP"));
        financial_CompQnetP.AddChild(OperaPermissions.Financial_CompQnetP + ".Create", L("Create"));
        financial_CompQnetP.AddChild(OperaPermissions.Financial_CompQnetP + ".Edit", L("Edit"));
        financial_CompQnetP.AddChild(OperaPermissions.Financial_CompQnetP + ".Delete", L("Delete"));

        var financial_QnetProfitReport = financial.AddPermission(OperaPermissions.Financial_QnetProfitReport, L("QnetProfitReport"));
        financial_QnetProfitReport.AddChild(OperaPermissions.Financial_QnetProfitReport + ".Create", L("Create"));
        financial_QnetProfitReport.AddChild(OperaPermissions.Financial_QnetProfitReport + ".Edit", L("Edit"));
        financial_QnetProfitReport.AddChild(OperaPermissions.Financial_QnetProfitReport + ".Delete", L("Delete"));

        var financial_CurrentDividends = financial.AddPermission(OperaPermissions.Financial_CurrentDividends, L("CurrentDividends"));
        financial_CurrentDividends.AddChild(OperaPermissions.Financial_CurrentDividends + ".Create", L("Create"));
        financial_CurrentDividends.AddChild(OperaPermissions.Financial_CurrentDividends + ".Edit", L("Edit"));
        financial_CurrentDividends.AddChild(OperaPermissions.Financial_CurrentDividends + ".Delete", L("Delete"));

        var financial_EnhancedRatios = financial.AddPermission(OperaPermissions.Financial_EnhancedRatios, L("EnhancedRatios"));
        financial_EnhancedRatios.AddChild(OperaPermissions.Financial_EnhancedRatios + ".Create", L("Create"));
        financial_EnhancedRatios.AddChild(OperaPermissions.Financial_EnhancedRatios + ".Edit", L("Edit"));
        financial_EnhancedRatios.AddChild(OperaPermissions.Financial_EnhancedRatios + ".Delete", L("Delete"));

        var financial_HistoricalCashDividends = financial.AddPermission(OperaPermissions.Financial_HistoricalCashDividends, L("HistoricalCashDividends"));
        financial_HistoricalCashDividends.AddChild(OperaPermissions.Financial_HistoricalCashDividends + ".Create", L("Create"));
        financial_HistoricalCashDividends.AddChild(OperaPermissions.Financial_HistoricalCashDividends + ".Edit", L("Edit"));
        financial_HistoricalCashDividends.AddChild(OperaPermissions.Financial_HistoricalCashDividends + ".Delete", L("Delete"));

        var financial_UploadIndicatorsBatch = financial.AddPermission(OperaPermissions.Financial_UploadIndicatorsBatch, L("UploadIndicatorsBatch"));
        financial_UploadIndicatorsBatch.AddChild(OperaPermissions.Financial_UploadIndicatorsBatch + ".Create", L("Create"));
        financial_UploadIndicatorsBatch.AddChild(OperaPermissions.Financial_UploadIndicatorsBatch + ".Edit", L("Edit"));
        financial_UploadIndicatorsBatch.AddChild(OperaPermissions.Financial_UploadIndicatorsBatch + ".Delete", L("Delete"));

        var financial_BatchesEntry = financial.AddPermission(OperaPermissions.Financial_BatchesEntry, L("BatchesEntry"));
        financial_BatchesEntry.AddChild(OperaPermissions.Financial_BatchesEntry + ".Create", L("Create"));
        financial_BatchesEntry.AddChild(OperaPermissions.Financial_BatchesEntry + ".Edit", L("Edit"));
        financial_BatchesEntry.AddChild(OperaPermissions.Financial_BatchesEntry + ".Delete", L("Delete"));

        var financial_BatchesReEntry = financial.AddPermission(OperaPermissions.Financial_BatchesReEntry, L("BatchesReEntry"));
        financial_BatchesReEntry.AddChild(OperaPermissions.Financial_BatchesReEntry + ".Create", L("Create"));
        financial_BatchesReEntry.AddChild(OperaPermissions.Financial_BatchesReEntry + ".Edit", L("Edit"));
        financial_BatchesReEntry.AddChild(OperaPermissions.Financial_BatchesReEntry + ".Delete", L("Delete"));

        var financial_BatchesAdmin = financial.AddPermission(OperaPermissions.Financial_BatchesAdmin, L("BatchesAdmin"));
        financial_BatchesAdmin.AddChild(OperaPermissions.Financial_BatchesAdmin + ".Create", L("Create"));
        financial_BatchesAdmin.AddChild(OperaPermissions.Financial_BatchesAdmin + ".Edit", L("Edit"));
        financial_BatchesAdmin.AddChild(OperaPermissions.Financial_BatchesAdmin + ".Delete", L("Delete"));



        #endregion




    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<OperaResource>(name);
    }
}

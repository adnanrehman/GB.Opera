﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GB.Opera.constants
{
    public static class ProcedureNames
    {
        public const string usp_getCompanies = "usp_getCompanies";
        public const string usp_InsertCompanies = "usp_InsertCompanies";
        public const string usp_getCompaniesFacts = "usp_getCompaniesFacts";
        public const string usp_InsertUpdateCompaniesFacts = "usp_InsertUpdateCompaniesFacts";
        public const string usp_getCompanyFactsOrders = "usp_getCompanyFactsOrders";
        public const string usp_UpdateCompanyFactOrders = "usp_UpdateCompanyFactOrders";
        public const string usp_getCompaniesManagement = "usp_getCompaniesManagement";
        public const string usp_InsertManagements = "usp_InsertManagements";
        public const string usp_InsertSnrManagement = "usp_InsertSnrManagement";
        public const string usp_InsertAuditors = "usp_InsertAuditors";
        public const string usp_InsertBMembers = "usp_InsertBMembers";
        public const string usp_InsertBranches = "usp_InsertBranches";
        public const string usp_InsertOverview = "usp_InsertOverview";
        public const string usp_InsertContacts = "usp_InsertContacts";
        public const string usp_InsertCompanyProjects = "usp_InsertCompanyProjects";
        public const string usp_getCompanyMutualFunds = "usp_getCompanyMutualFunds";
        public const string usp_InsertUpdateMutualFunds = "usp_InsertUpdateMutualFunds";
        public const string usp_getCompanyOwnershipPreview = "usp_getCompanyOwnershipPreview";
        public const string usp_InsertUpdateCompanyOwnerships = "usp_InsertUpdateCompanyOwnerships";
        public const string usp_getCompanyRelatedInformations = "usp_getCompanyRelatedInformations";
        public const string usp_InsertUpdateSubsidiaries = "usp_InsertUpdateSubsidiaries";
        public const string usp_InsertUpdateSubsCompUpdate = "usp_InsertUpdateSubsCompUpdate";
        public const string usp_InsertUpdateSistorCompanies = "usp_InsertUpdateSistorCompanies";
        public const string usp_InsertUpdateCompaniesProducts = "usp_InsertUpdateCompaniesProducts";
        public const string usp_InsertUpdateRawMaterials = "usp_InsertUpdateRawMaterials";
        public const string usp_InsertUpdateForeignInvementOptions = "usp_InsertUpdateForeignInvementOptions";
        public const string usp_InsertUpdateMiscNotes = "usp_InsertUpdateMiscNotes";
        public const string getPSRParentID = "getPSRParentID";
        public const string usp_InsertUpdatePSRCompanyServices = "usp_InsertUpdatePSRCompanyServices";
        public const string usp_InsertUpdatePSRCompanyProducts = "usp_InsertUpdatePSRCompanyProducts";
        public const string usp_InsertUpdatePSRCompanyRawMaterials = "usp_InsertUpdatePSRCompanyRawMaterials";
        public const string usp_getAnnoucementsInfo = "usp_getAnnoucementsInfo";
        public const string usp_DT_InsertUpdateCorporateAnnouncements = "usp_DT_InsertUpdateCorporateAnnouncements";
        public const string usp_DeleteCooperateAnnouncement = "usp_DeleteCooperateAnnouncement";
        public const string usp_getCountriesFacts = "usp_getCountriesFacts";
        public const string usp_InsertUpdateCountriesFacts = "usp_InsertUpdateCountriesFacts";
        public const string usp_getCountryFactsOrders = "usp_getCountryFactsOrders";
        public const string usp_UpdateCountryFactOrders = "usp_UpdateCountryFactOrders";
        public const string usp_getGCCStockMarkets = "usp_getGCCStockMarkets";
        public const string usp_getPrices = "usp_getPrices";
        public const string usp_getEstimatesandForecasts = "usp_getEstimatesandForecasts";
        public const string usp_InsetUpdateEstimatesandForecasts = "usp_InsetUpdateEstimatesandForecasts";
        public const string GetGBFactsData = "GetGBFactsData";
        public const string usp_AddUpdateGBFact = "usp_AddUpdateGBFact";
        public const string usp_RenameFactByMenu = "usp_RenameFactByMenu";
        public const string getGBAccounts_New = "getGBAccounts_New";
        public const string usp_getAllFactsOwnershipMappings = "usp_getAllFactsOwnershipMappings";
        public const string usp_AddUpdateGBOwnership = "usp_AddUpdateGBOwnership";
        public const string usp_GetGBOwnershipbyId_New = "usp_GetGBOwnershipbyId_New";
        public const string usp_deleteOwnershipById = "usp_deleteOwnershipById";
        public const string usp_getCompStockMarkets = "usp_getCompStockMarkets";
        public const string usp_getCompaniesFromMarket = "usp_getCompaniesFromMarket";
        public const string usp_getOfficialIndices = "usp_getOfficialIndices";
        public const string usp_getGBIndices = "usp_getGBIndices";
        public const string usp_getGlobalIndices = "usp_getGlobalIndices";
        public const string usp_getMFundCompanies = "usp_getMFundCompanies";
        public const string usp_getAllFunds = "usp_getAllFunds";
        public const string usp_getAllFundPrices = "usp_getAllFundPrices";
        public const string usp_getCompaniesFinanicalTickers = "usp_getCompaniesFinanicalTickers";
        public const string usp_getEntryReEntryUsers_New = "usp_getEntryReEntryUsers_New";
        public const string usp_getCompanyLatestFinanicals_New = "usp_getCompanyLatestFinanicals_New";
        public const string usp_InsertPrice_New = "InsertPrice_New";
        public const string usp_getStatusFinancials_New = "usp_getStatusFinancials_New";
        public const string usp_getCompaniesAccounts = "usp_getCompaniesAccounts";
        public const string usp_getCompaniesAccounts_New = "usp_getCompaniesAccounts_New";
        public const string usp_getAsofDatesFinancials = "usp_getAsofDatesFinancials";
        public const string usp_InsertFinancialsNewReview_New = "usp_InsertFinancialsNewReview_New";
        public const string usp_SetNewReviewFinanUploadedPath_New = "usp_SetNewReviewFinanUploadedPath_New";
        public const string usp_InsertUpdateFinancialValues = "usp_InsertUpdateFinancialValues_New";
        public const string usp_InsertUpdateFinancialCommentsStatus_New = "usp_InsertUpdateFinancialCommentsStatus_New";
        public const string usp_InsertFinReviewFromEntry_New = "usp_InsertFinReviewFromEntry_New";
        public const string usp_CompanyCurrentValues = "usp_CompanyCurrentValues";
        public const string usp_getCompAdminFinancials_New = "usp_getCompAdminFinancials_New";
        public const string usp_UpdateAdminFinancialsAllParams_New = "usp_UpdateAdminFinancialsAllParams_New";
        public const string usp_UpdateFinancialRateChanges = "usp_UpdateFinancialRateChanges";
        public const string usp_getHistoricalCashDividends = "usp_getHistoricalCashDividends";
        public const string usp_InsetUpdateHistoricalCashDividends = "usp_InsetUpdateHistoricalCashDividends";
        public const string usp_InsertUpdateCashDividendsDates = "usp_InsertUpdateCashDividendsDates";
        public const string usp_getCompaniesQNetProfits = "usp_getCompaniesQNetProfits";
        public const string usp_InsertUpdateCalculateCompQuartersNetProfit = "usp_InsertUpdateCalculateCompQuartersNetProfit";
        public const string usp_getCurrentDividends = "usp_getCurrentDividends";
        public const string usp_insertUpdateCurrentDividends = "usp_insertUpdateCurrentDividends";
        public const string RPT_ReviewReportQuarterlyNew = "RPT_ReviewReportQuarterlyNew";
        public const string RPT_ReviewReport_New = "RPT_ReviewReport_New";
        public const string usp_InsertOfficialIndices = "usp_InsertOfficialIndices_New";
        public const string usp_InsertGlobalIndices = "usp_InsertGlobalIndices_New";
        public const string usp_getCountryGroupInfo_New = "usp_getCountryGroupInfo_New";
        public const string usp_InsertCGroup_New = "usp_InsertCGroup_New";
        public const string usp_InsertNewGBSector_New = "usp_InsertNewGBSector_New";
        public const string usp_getMarketsInfo = "usp_getMarketsInfo";
        public const string usp_getCountryInfo = "usp_getCountryInfo";
        public const string usp_UpdateCountryInfo = "usp_UpdateCountryInfo";
        public const string usp_InsertBanks = "usp_InsertBanks";
        public const string usp_InsertBrokers = "usp_InsertBrokers";
        public const string usp_InsertEconomicIndicators = "usp_InsertEconomicIndicators";
        public const string usp_InsertMFundPrices = "usp_InsertMFundPrices_New";
        public const string usp_InsertMarketInfo = "usp_InsertMarketInfo";
        public const string usp_InsertMarketSectors = "usp_InsertMarketSectors";
        public const string usp_InsertMarketCaps = "usp_InsertMarketCaps";
        public const string getCurrencyExchange = "getCurrencyExchange";
        public const string usp_InsertCurrencyExchange = "usp_InsertCurrencyExchange";
        public const string Deletefianancial = "Deletefianancial";
        public const string CheckFinancialsQYPeriods = "CheckFinancialsQYPeriods";
        public const string usp_getBatchesReEntry_New = "usp_getBatchesReEntry_New";
        public const string usp_getBatchesForReEntry = "usp_getBatchesForReEntry";
        public const string usp_UpdateBatchStatus = "usp_UpdateBatchStatus";
        public const string usp_getBatchesEntry_New = "usp_getBatchesEntry_New";
        public const string usp_getESDFactsMappingsYearly_New = "usp_getESDFactsMappingsYearly_New";
        public const string usp_InserUpdateBatchDetail = "usp_InserUpdateBatchDetail";
        public const string usp_getCountriesForBatches_New = "usp_getCountriesForBatches_New";
        public const string usp_SearchBatch = "usp_SearchBatch";
        public const string usp_InserUpdateBatch_New = "usp_InserUpdateBatch_New";
        public const string usp_getAdminBatches = "usp_getAdminBatches";
        public const string usp_getCountriesFactsTitles = "usp_getCountriesFactsTitles";
        public const string usp_InserUpdateBatch = "usp_InserUpdateBatch";
        public const string usp_getAllESDFactsMappings = "usp_getAllESDFactsMappings";
        public const string usp_getESDFactParams = "usp_getESDFactParams";
        public const string usp_DeleteGBFact = "usp_DeleteGBFact";
        public const string usp_AddUpdateESDFact = "usp_AddUpdateESDFact";
        public const string InsertOrUpdateGulfbaseVideo = "InsertOrUpdateGulfbaseVideo";
        public const string usp_getGulfbaseVideos = "usp_getGulfbaseVideos";
        public const string usp_getAllPSRMappings_New = "usp_getAllPSRMappings_New";
        public const string usp_AddUpdatePSR_New = "usp_AddUpdatePSR_New";
        public const string USP_GetProductServiceRawByID = "USP_GetProductServiceRawByID";
        public const string usp_deleteCompQuartersNetProfit = "usp_deleteCompQuartersNetProfit";
             public const string usp_deleteSubsComp = "usp_deleteSubsComp";
        public const string Usp_deletesistercompany = "Usp_deletesistercompany";
        public const string usp_deleteCompanyProducts = "usp_deleteCompanyProducts";
        public const string usp_delteCompanyRawMaterials = "usp_delteCompanyRawMaterials";
        public const string Usp_deleteForeignInvestmentPermitted = "Usp_deleteForeignInvestmentPermitted";
        public const string Usp_deleteMiscNotes = "Usp_deleteMiscNotes";
        public const string usp_getLastYearFinEndRecordForQNP = "usp_getLastYearFinEndRecordForQNP";

    }
}
 

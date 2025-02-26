using Dapper;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Volo.Abp.Data;
using Commons;
using System.Reflection;
using System.ComponentModel.Design;
using GB.Opera.constants;

namespace Companies
{
    public class CompanyAppService : ApplicationService, ICompanyAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("DefaultForNews"));
        }

        public async Task<List<CompanyDto>> GetCompanies(int sectorID, int stockMarketID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CompanyDto>(sql: ProcedureNames.usp_getCompanies,
                                param: new { StockMarketID = stockMarketID, SectorID = sectorID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<CompanyDto> CreateOrUpdateCompany(CompanyDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Company", model.Company);
                parameters.Add("@ACompany", model.ACompany);
                parameters.Add("@Ticker", model.Ticker);
                parameters.Add("@ATicker", model.ATicker);
                parameters.Add("@StockMarketID", model.StockMarketID);
                parameters.Add("@SectorID", model.SectorID);
                parameters.Add("@CapSizeID", model.CapSizeID);
                parameters.Add("@GBSectorID", model.GBSectorID);
                parameters.Add("@GBIndustrialGroupsID", model.GBIndustrialGroupsID);
                parameters.Add("@GBIndustryID", model.GBIndustryID);
                parameters.Add("@InternalCategoryID", model.InternalCategoryID);
                parameters.Add("@Overview", model.Overview);
                parameters.Add("@AOverview", model.AOverview);
                parameters.Add("@BusinessActivity", model.BusinessActivity);
                parameters.Add("@ABusinessActivity", model.ABusinessActivity);
                parameters.Add("@Ownership", model.Ownership);
                parameters.Add("@AOwnership", model.AOwnership);
                parameters.Add("@Branches", model.Branches);
                parameters.Add("@ABranches", model.ABranches);
                parameters.Add("@YearEnd", model.YearEnd);
                parameters.Add("@MainCompany", model.MainCompany);
                parameters.Add("@HasFunds", model.HasFunds);
                parameters.Add("@ActiveIndices", model.ActiveIndices);
                parameters.Add("@FinancialCurrencyID", model.FinancialCurrencyID);
                parameters.Add("@TradingMainCurrencyID", model.TradingMainCurrencyID);
                parameters.Add("@TradingSubCurrencyID", model.TradingSubCurrencyID);
                parameters.Add("@Logo", model.Logo != null ? model.Logo.ToArray() : null, DbType.Binary);

                parameters.Add("@EstablishmentDate", model.EstablishmentDate);
                parameters.Add("@CreationDate", DateTime.Now);
                parameters.Add("@IsActive", model.IsActive);
                parameters.Add("@OrderID", model.OrderID);
                parameters.Add("@AlternativeTicker", model.AlternativeTicker);
                parameters.Add("@StockTicker", model.StockTicker);
                parameters.Add("@EnglishShortName", model.EnglishShortName);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertCompanies, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

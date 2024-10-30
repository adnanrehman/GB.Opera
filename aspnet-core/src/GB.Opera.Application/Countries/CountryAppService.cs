using Commons;
using CountryGroups;
using Dapper;
using Entry;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using Polly.Caching;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Description;
using System.Xml.Linq;
using Volo.Abp.Application.Services;
using static OfficeOpenXml.ExcelErrorValue;
using static Volo.Abp.UI.Navigation.DefaultMenuNames.Application;

namespace Countries
{
    public class CountryAppService : ApplicationService, ICountryAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CountryAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<CountryInputDto> GetCountryInfos(int countryID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCountryInfo,
                    param: new { CountryID = countryID },
                commandType: CommandType.StoredProcedure);
                var output = new CountryInputDto();
                output.CountryGroups = reader.Read<CountryGroupDto>().OrderBy(f => f.CountryGroup).ToList();
                output.Countries = reader.Read<CountryDto>().ToList();
                output.CountryInfos = reader.Read<CountryInfoDto>().ToList();
                output.Banks = reader.Read<BankDto>().ToList();
                output.Brokers = reader.Read<BrokerDto>().ToList();
                output.EconomicIndicators = reader.Read<EconomicIndicatorDto>().ToList();
                output.EconomicIndicatorTypes = reader.Read<EconomicIndicatorTypeDto>().ToList();
                output.ValueDeterminations = reader.Read<ValueDeterminationDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        
        public async Task InsertCountryInfo(CountryInfoDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CountryID", model.CountryID);
                parameters.Add("@CountryGroupID", model.CountryGroupID);
                parameters.Add("@Country", model.Country);
                parameters.Add("@ACountry", model.ACountry);
                parameters.Add("@Abbr", model.Abbr);
                parameters.Add("@CountryDescription", model.CountryDescription);
                parameters.Add("@ACountryDescription", model.ACountryDescription);
                parameters.Add("@IsActive", model.IsActive);
                parameters.Add("@CountryProfileID", model.CountryProfileID);
                parameters.Add("@CountryProfileName", model.CountryProfileName);
                parameters.Add("@ACountryProfileName", model.ACountryProfileName);
                parameters.Add("@EconIndicatorName", model.EconIndicatorName);
                parameters.Add("@AEconIndicatorName", model.AEconIndicatorName);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);

                await _connection.ExecuteAsync(ProcedureNames.usp_UpdateCountryInfo, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task InsertBank(BankDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@BankID", model.BankID);
                parameters.Add("@CountryProfileID", model.CountryProfileID);
                parameters.Add("@Bank", model.Bank);
                parameters.Add("@ABank", model.ABank);
                parameters.Add("@City", model.City);
                parameters.Add("@ACity", model.ACity);
                parameters.Add("@Address", model.Address);
                parameters.Add("@AAddress", model.AAddress);
                parameters.Add("@Tel", model.Tel);
                parameters.Add("@Fax", model.Fax);
                parameters.Add("@Email", model.Email);
                parameters.Add("@WebSite", model.WebSite);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertBanks, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task InsertBroker(BrokerDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@BrokerID", model.BrokerID);
                parameters.Add("@CountryProfileID", model.CountryProfileID);
                parameters.Add("@Broker", model.Broker);
                parameters.Add("@ABroker", model.ABroker);
                parameters.Add("@City", model.City);
                parameters.Add("@ACity", model.ACity);
                parameters.Add("@Address", model.Address);
                parameters.Add("@AAddress", model.AAddress);
                parameters.Add("@Tel", model.Tel);
                parameters.Add("@Fax", model.Fax);
                parameters.Add("@Email", model.Email);
                parameters.Add("@WebSite", model.WebSite);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertBrokers, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task InsertEconomicIndicator(EconomicIndicatorDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@EconomicIndicatorID", model.EconomicIndicatorID);
                parameters.Add("@EconomicIndicatorTypeID", model.EconomicIndicatorTypeID);
                parameters.Add("@CountryProfileID", model.CountryProfileID);
                parameters.Add("@ValueDeterminationID", model.ValueDeterminationID);
                parameters.Add("@IndicatorType", model.IndicatorType);
                parameters.Add("@Year", model.Year);
                parameters.Add("@ValueIn", model.ValueIn);
                parameters.Add("@Value", model.Value);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertEconomicIndicators, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}

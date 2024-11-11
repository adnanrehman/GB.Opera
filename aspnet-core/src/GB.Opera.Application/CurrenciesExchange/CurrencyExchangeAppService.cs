using Dapper;
using Entry;
using GB.Opera.constants;
using GB.Opera.MarketSector;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Volo.Abp.Application.Services;


namespace GB.Opera.CurrenciesExchange
{
    public  class CurrencyExchangeAppService : ApplicationService, ICurrencyExchangeAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CurrencyExchangeAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CurrencyExchangeDto>> GetCurrency(DateTime Date)
        {
            try
            {
                var data = (await _connection.QueryAsync<CurrencyExchangeDto>(sql: ProcedureNames.getCurrencyExchange,
                                param: new { Date = Date },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task usp_InsertCurrencyExchange(List<CurrencyExchangeDto> list)
        {
            foreach (var item in list)
            {
                var parameters = new DynamicParameters();
               
                parameters.Add("@From", item.CurrencyFrom);
                parameters.Add("@To", item.CurrencyTo);
                parameters.Add("@Exchange", item.Exchange);
                parameters.Add("@Date", item.Date);
                

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertCurrencyExchange, parameters, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

using Commons;
using Dapper;
using Entry;
using GB.Opera.constants;
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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CurrentDividends
{
    public class CurrentDividendAppService : ApplicationService, ICurrentDividendAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CurrentDividendAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("DefaultForNews"));
        }
        public async Task<List<CurrentDividendDto>> GetCurrentDividends(int stockMarketID)
        {
            try
            {
                try
                {
                    var data = (await _connection.QueryAsync<CurrentDividendDto>(sql: ProcedureNames.usp_getCurrentDividends, param: new { StockMarketID = stockMarketID },
                                    commandType: CommandType.StoredProcedure)).ToList();
                    return data;
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task InsertUpdateCurrentDividends(List<CurrentDividendDto> input)
        {
            try
            {
                foreach (var item in input)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@CurrentDividendID", item.CurrentDividendID);
                    parameters.Add("@Ticker", item.Ticker);
                    parameters.Add("@CurrentDividend", item.CurrentDividend);
                    parameters.Add("@Remarks", item.Remarks);
                    parameters.Add("@CompanyID", item.CompanyID);

                    await _connection.ExecuteAsync(ProcedureNames.usp_insertUpdateCurrentDividends, parameters, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

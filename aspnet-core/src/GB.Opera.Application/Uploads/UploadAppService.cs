using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Dapper;
using Companies;
using Volo.Abp.Application.Services;
using GB.Opera.constants;

namespace GB.Opera.Uploads
{
    public  class UploadAppService : ApplicationService, IUpload
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public UploadAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public async Task<UploadwithHasDtos> UploadwithHasDtos(int MarketID, int SectorID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCompaniesFinanicalTickers,
                  param: new { MarketID = MarketID, SectorID= SectorID } ,

            commandType: CommandType.StoredProcedure);

                var output = new UploadwithHasDtos();
                output.Companies = reader.Read<CompanyDto>().ToList();
                 output.Period = reader.Read<Periods>().ToList();
                output.FinancialEntryType = reader.Read<FinancialEntryTypes>().ToList();
               
                output.QPeriodType = reader.Read<QPeriodTypes>().ToList();
               // output.Uploads = reader.Read<Upload>().ToList();
                return output;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Users>> _getEntryReEntryUsers()
        {
            try
            {
                var data = (await _connection.QueryAsync<Users>(sql: ProcedureNames.usp_getEntryReEntryUsers_New,
                                param: new {},
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<List<UploadFinancials>> GetFinancialsBycompanyId(int CompanyID)
        {
            try
            {
                var data = (await _connection.QueryAsync<UploadFinancials>(sql: ProcedureNames.usp_getCompanyLatestFinanicals,
                                param: new { CompanyID  = CompanyID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}

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

namespace CompanyCurrentValues
{
    public class CompanyCurrentValuesAppService : ApplicationService, ICompanyCurrentValuesAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyCurrentValuesAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        //public async Task<List<CompanyCurrentValuesdtos>> GetCompanyCurrentValues(short companyID)
        //{
        //    try
        //    {
        //        var data = await _connection.QueryAsync<CompanyCurrentValuesdtos>(
        //            sql: ProcedureNames.usp_CompanyCurrentValues,
        //            param: new { CompanyID = companyID },
        //            commandType: CommandType.StoredProcedure
        //        );

        //        return data.ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception (consider using a logging framework)
        //        // e.g., _logger.LogError(ex, "Error occurred while fetching current values for CompanyID: {CompanyID}", companyID);

        //        // Optionally, throw a more descriptive exception
        //        throw new Exception("An error occurred while fetching company current values.", ex);
        //    }
        //}

        public async Task<List<CompanyCurrentValuesdtos>> GetCompanyCurrentValues(int companyID)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@CompanyID", companyID, DbType.Int32);

                // Execute the stored procedure and retrieve data using Dapper
                var data = await _connection.QueryAsync<CompanyCurrentValuesdtos>(
                    sql: ProcedureNames.usp_CompanyCurrentValues,
                    param: parameters,
                    commandType: CommandType.StoredProcedure
                );
                return data.ToList();
            }
            catch (Exception ex )
            {

                throw ex;
            }
            // Define the parameters for the stored procedure
          

           


        }
    }
}

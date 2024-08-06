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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CompanyPSRaws
{
    public class CompanyPSRawAppService : ApplicationService, ICompanyPSRawAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyPSRawAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<CompanyPSRawOutputDto> GetCompanyPSRaws(int productServiceRawID, int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync("[getPSRParentID]",
                    param: new { @ProductServiceRawID = productServiceRawID, @CompanyID = companyID },
                commandType: CommandType.StoredProcedure);
                var output = new CompanyPSRawOutputDto();
                output.CompanyPSRaws = reader.Read<CompanyPSRawDto>().ToList();
                output.ProductServiceRawID = reader.Read<int>().FirstOrDefault();
                return output;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


    }
}

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
using System.Security.Cryptography.X509Certificates;
using System.Xml.Linq;
using static Volo.Abp.UI.Navigation.DefaultMenuNames.Application;
using System.Text.RegularExpressions;
using CompanyMutualFundSettings;
using GB.Opera.Books;
using CompanyOwnershipFacts;

namespace CompanyOwnershipFacts
{
    public class CompanyOwnershipFactAppService : ApplicationService, ICompanyOwnershipFactAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyOwnershipFactAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CompanyOwnershipFactDto>> GetCompanyOwnershipPreview(int companyID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CompanyOwnershipFactDto>(sql: "usp_getCompanyOwnershipPreview",
                                param: new { CompanyID = companyID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<CompanyOwnershipFactEditDto> CreateOrUpdateCompanyOwnerships(CompanyOwnershipFactEditDto dto)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@GBOwnershipID", dto.GBOwnershipID);
                parameters.Add("@CompanyID", dto.CompanyID);
                parameters.Add("@ParentID", dto.ParentID);
                parameters.Add("@Value", dto.Value);

                await _connection.ExecuteAsync("usp_InsertUpdateCompanyOwnerships", parameters, commandType: CommandType.StoredProcedure);

                return dto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

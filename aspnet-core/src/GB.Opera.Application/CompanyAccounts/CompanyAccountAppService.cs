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
using GB.Opera.constants;
using System.Text.Json;

namespace CompanyAccounts
{
    public class CompanyAccountAppService : ApplicationService, ICompanyAccountAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyAccountAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CompanyGBFactMappingDto>> GetCompaniesFacts(int companyID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CompanyGBFactMappingDto>(sql: ProcedureNames.usp_getCompaniesFacts,
                                param: new { CompanyID = companyID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<List<CompanyGBFactMappingDto>> CreateOrUpdateCompanyFacts(List<CompanyGBFactMappingDto> list,int companyId)
        {
            try
            {
                var parameters4 = new DynamicParameters();
                parameters4.Add("@CompanyID", companyId);
                await _connection.ExecuteAsync(ProcedureNames.usp_SetCompFactsFalse, parameters4, commandType: CommandType.StoredProcedure);


                List<CompanyGBFactMappingDto> josnList = new List<CompanyGBFactMappingDto>();
                foreach (var company in list) {
                    josnList.Add(new CompanyGBFactMappingDto
                    {
                        CompanyID = company.CompanyID,
                        GBFactID = company.GBFactID,
                        ParentID = company.ParentID,
                        CustomFactName = company.CustomFactName,
                        ACustomFactName = company.ACustomFactName,

                    });                    
                }
                var parameters = new DynamicParameters();
                parameters.Add("@Json", JsonSerializer.Serialize(josnList));
                parameters.Add("@CompanyID", companyId);
                //parameters.Add("@CompanyID", company.CompanyID);
                //parameters.Add("@GBFactID", company.GBFactID);
                //parameters.Add("@ParentID", company.ParentID);
                //parameters.Add("@CustomFactName", company.CustomFactName);
                //parameters.Add("@ACustomFactName", company.ACustomFactName);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertUpdateCompaniesFacts, parameters, commandType: CommandType.StoredProcedure);

                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

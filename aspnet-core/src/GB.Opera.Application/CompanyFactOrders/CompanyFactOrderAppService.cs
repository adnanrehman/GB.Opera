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

namespace CompanyFactOrders
{
    public class CompanyFactOrderAppService : ApplicationService, ICompanyFactOrderAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyFactOrderAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CompanyFactOrderDto>> GetCompaniesFactOrders(int companyID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CompanyFactOrderDto>(sql: ProcedureNames.usp_getCompanyFactsOrders,
                                param: new { CompanyID = companyID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<List<CompanyFactOrderDto>> CreateOrUpdateCompanyFactOrder(List<CompanyFactOrderDto> list)
        {
            try
            {
                foreach (var company in list) {
                    var parameters = new DynamicParameters();
                    parameters.Add("@CompanyFactOrdrID", company.CompanyFactOrdrID);
                    parameters.Add("@FactName", company.FactName);
                    parameters.Add("@GBFactIDOrder", company.GBFactIDOrder);
                    parameters.Add("@CustomOrder", company.CustomOrder);
                    parameters.Add("@CheckMe", company.CheckMe);
                    parameters.Add("@IsQuarterly", company.IsQuarterly);
                    parameters.Add("@IRy", company.IRy);
                    parameters.Add("@IRq", company.IRq);

                    await _connection.ExecuteAsync(ProcedureNames.usp_UpdateCompanyFactOrders, parameters, commandType: CommandType.StoredProcedure);
                }

                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

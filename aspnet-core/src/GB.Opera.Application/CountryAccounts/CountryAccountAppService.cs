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
using GB.Opera.Books;

namespace CountryAccounts
{
    public class CountryAccountAppService : ApplicationService, ICountryAccountAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CountryAccountAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CountryAccountDto>> GetCountriesFacts(int CountryID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CountryAccountDto>(sql: "[usp_getCountriesFacts]",
                                param: new { CountryID = CountryID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<List<CountryAccountDto>> CreateOrUpdateCountryFact(List<CountryAccountDto> list)
        {
            try
            {
                foreach (var Country in list) {
                    var parameters = new DynamicParameters();
                    parameters.Add("@CountryID", Country.CountryID);
                    parameters.Add("@ESDFactID", Country.ESDFactID);
                    parameters.Add("@ParentID", Country.ParentID);
                    parameters.Add("@CountryCustomFactName", Country.CountryCustomFactName);
                    parameters.Add("@ACountryCustomFactName", Country.ACountryCustomFactName);

                    await _connection.ExecuteAsync("usp_InsertUpdateCountriesFacts", parameters, commandType: CommandType.StoredProcedure);
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

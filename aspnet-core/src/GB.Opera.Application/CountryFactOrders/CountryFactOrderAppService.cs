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

namespace CountryFactOrders
{
    public class CountryFactOrderAppService : ApplicationService, ICountryFactOrderAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CountryFactOrderAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CountryFactOrderDto>> GetCountryFactOrders(int CountryID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CountryFactOrderDto>(sql: "usp_getCountryFactsOrders",
                                param: new { CountryID = CountryID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<List<CountryFactOrderDto>> CreateOrUpdateCountryFactOrder(List<CountryFactOrderDto> list)
        {
            try
            {
                foreach (var Country in list) {
                    var parameters = new DynamicParameters();
                    parameters.Add("@CountryFactOrdrID", Country.CountryFactOrdrID);
                    parameters.Add("@FactName", Country.FactName);
                    parameters.Add("@ESDFactIDOrder", Country.ESDFactIDOrder);
                    parameters.Add("@CustomOrder", Country.CustomOrder);
                    parameters.Add("@MeasurementUnit", Country.MeasurementUnit);
                    parameters.Add("@Currency", Country.Currency);

                    await _connection.ExecuteAsync("usp_UpdateCountryFactOrders", parameters, commandType: CommandType.StoredProcedure);
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

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
using GB.Opera.constants;
using GB.Opera.OfficialsIndics;
using Castle.MicroKernel.Registration;

namespace FundPrices
{
    public class FundPriceAppService : ApplicationService, IFundPriceAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public FundPriceAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task InsertMFundPrices(MFundPrices model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@MFundPriceID", model.MFundPriceID);
                parameters.Add("@MFundID", model.MFundID);
                parameters.Add("@PriceDate", model.PriceDate);
                parameters.Add("@ClosingPrice", model.ClosingPrice);
                parameters.Add("@TradingVolume", model.TradingVolume);
                parameters.Add("@LastClosePrice", model.LastClosePrice);
                parameters.Add("@LastUpdated", DateTime.Now);
                parameters.Add("@IsActive", model.IsActive);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertMFundPrices, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}

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
using Companies;
using System.Text.Json;

namespace FundPrices
{
    public class FundPriceAppService : ApplicationService, IFundPriceAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public FundPriceAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("DefaultForNews"));
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

		public async Task<string> ImportMFundPrices(List<MFundPrices> list)
		{
			_connection.Open();
            List<MFundPrices> josnList = new List<MFundPrices>();
            try
            {
                var mFunds = await _connection.QueryAsync<MFunds>($@"Select MFundID,Name,ShortName from MFunds WHERE ShortName IS NOT NULL");
                var Companies = await _connection.QueryAsync<CompanyDto>($@"SELECT Ticker,CompanyID,Company FROM Companies");

                foreach (var item in list)
                {
                    if (item != null)
                    {
                        if (!string.IsNullOrEmpty(item.Ticker) && !string.IsNullOrEmpty(item.MFund))
                        {
                            var company = Companies.Where(f => f.Ticker.ToUpper() == (item.Ticker).ToUpper()).FirstOrDefault();
                            if (company != null)
                            {
                                var mfund = mFunds.Where(f => f.ShortName.ToUpper() == (item.MFund).ToUpper() && f.CompanyID == company.CompanyID).FirstOrDefault();
                                if (mfund != null)
                                {
                                    josnList.Add(new MFundPrices
                                    {
                                        PriceDate = item.PriceDate,
                                        MFundID = mfund.MFundID,
                                        ClosingPrice = item.ClosingPrice,
                                        TradingVolume = item.TradingVolume
                                    });
                                }
                                else
                                {
                                    return $@"{item.MFund} not exist please first add this Mutual Fund";
                                }
                            }
                            else
                            {
                                return $@"{item.Ticker} not exist please first add this Company";
                            }
                        }
                    }
                }
                if (josnList.Count > 0)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Json", JsonSerializer.Serialize(josnList));
                    parameters.Add("@PriceDate", josnList.Select(g => g.PriceDate).FirstOrDefault());
                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertMFundPrices_New, parameters, commandType: CommandType.StoredProcedure);
                }
                return "1";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
		}
	}
}

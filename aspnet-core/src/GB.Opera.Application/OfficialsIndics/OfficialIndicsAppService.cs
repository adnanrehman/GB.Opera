using Commons;
using Companies;
using Dapper;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using OfficeOpenXml.Interfaces.Drawing.Text;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Transactions;
using Volo.Abp.Application.Services;

namespace GB.Opera.OfficialsIndics
{
    public  class OfficialIndicsAppService : ApplicationService, IOfficialIndicsAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public OfficialIndicsAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("DefaultForNews"));
        }

        public async Task<List<OfficialIndics>> GetOfficialIndics(DateTime PriceDate, Int16 StockMarketID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@Date", PriceDate, DbType.DateTime);
            parameters.Add("@StockMarketID ", StockMarketID, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<OfficialIndics>(
                sql: ProcedureNames.usp_getOfficialIndices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }
        public async Task<List<GulfbasePrices>> Getgulfbaseprices(DateTime PriceDate )
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@Date", PriceDate, DbType.DateTime);
            

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<GulfbasePrices>(
                sql: ProcedureNames.usp_getGBIndices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<List<GlobalIndices>> GetGlobalIndices(DateTime PriceDate)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@Date", PriceDate, DbType.DateTime);


            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<GlobalIndices>(
                sql: ProcedureNames.usp_getGlobalIndices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<List<MFundCompanies>>  GetMFundCompanies()
        {
            // Execute the stored procedure and retrieve MFundCompanies data using Dapper
            var data = (await _connection.QueryAsync<MFundCompanies>(
                sql: ProcedureNames.usp_getMFundCompanies, // Use the correct stored procedure name
                param: null,
                commandType: CommandType.StoredProcedure
            )).ToList();

            return data;
        }

        public async Task<List<MFunds>>  GetAllFunds(Int16 CompanyID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@CompanyID", CompanyID, DbType.Int16);


            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<MFunds>(
                sql: ProcedureNames.usp_getAllFunds,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }
        public async Task<List<MFundPrices>> GetAllFundPrices(Int64 MFundID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@MFundID", MFundID, DbType.Int16);


            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<MFundPrices>(
                sql: ProcedureNames.usp_getAllFundPrices,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<string> ImportOfficialIndices(List<ImportOfficialIndicesDto> list)
        {
            _connection.Open();

            try
            {
                var stockMarkets = await _connection.QueryAsync<StockMarketDto>($@"SELECT * FROM StockMarkets");

                var sectors = await _connection.QueryAsync<SectorDto>($@"SELECT * FROM Sectors");
                var sector = new SectorDto();
                List<ImportOfficialIndicesDto> josnList = new List<ImportOfficialIndicesDto>();
               
                foreach (var item in list)
                {

                    var stockMarket = stockMarkets.Where(f => f.Abbr.ToUpper() == (item.StockMarket).ToUpper()).FirstOrDefault();
                    if (stockMarket != null)
                    {
                        int? sectorId = null;
                       
                        if (!string.IsNullOrWhiteSpace(item.Sector))
                        {
                            sector = sectors.Where(f => f.Sector.Trim().ToUpper() == (item.Sector.Trim()).ToUpper()).FirstOrDefault();

                            if (sector == null)
                            {
                                return $@"{item.Sector} not exist please first add this Sector";
                            }
                            sectorId = sector.SectorID;
                        }

                        josnList.Add(new ImportOfficialIndicesDto
                        {
                            StockMarketId = stockMarket.StockMarketID,
                            SectorId = sectorId,
                            Date = item.Date,
                            Open = item.Open,
                            High = item.High,
                            Low = item.Low,
                            Close = item.Close,
                            Volume = item.Volume,
                            Transaction = item.Transaction,
                            Value = item.Value,
                            PreviousClose = item.PreviousClose,
                            LastUpdated = DateTime.Now,

                        });
                    }
                    else
                    {
                        return $@"{item.StockMarket} not exist please first add this Stock Market";
                    }
                    //}
                }

                if (josnList.Count > 0)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Json", JsonSerializer.Serialize(josnList));
                    parameters.Add("@StockMarketId", josnList.Select(g => g.StockMarketId).FirstOrDefault());
                    parameters.Add("@Date", josnList.Select(g => g.Date).FirstOrDefault());
                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertOfficialIndices, parameters, commandType: CommandType.StoredProcedure);
                }

                return "1";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }


        }

        public async Task<string> ImportGlobalIndices(List<ImportGlobalIndicesDto> list)
        {

            _connection.Open();

            List<ImportGlobalIndicesDto> josnList = new List<ImportGlobalIndicesDto>();
            try
            {
                foreach (var item in list)
                {
                    if (item != null)
                    {
                        if (!string.IsNullOrEmpty(item.StockMarket))
                        {
                            var stockMarkets = await _connection.QueryAsync<StockMarketDto>($@"SELECT * FROM StockMarkets");
                            var stockMarket = stockMarkets.Where(f => f.Abbr.ToUpper() == (item.StockMarket).ToUpper()).FirstOrDefault();
                            if (stockMarket != null)
                            {

                                josnList.Add(new ImportGlobalIndicesDto
                                {
                                    StockMarketID = stockMarket.StockMarketID,
                                    Date = item.Date,
                                    Open = item.Open,
                                    High = item.High,
                                    Low = item.Low,
                                    Close = item.Close,
                                    Volume = item.Volume
                                });
                            }
                            else
                            {
                                return $@"{item.StockMarket} not exist please first add this Stock Market";
                            }
                        }
                    }
                }

                if (josnList.Count > 0)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@Json", JsonSerializer.Serialize(josnList));
                    parameters.Add("@Date", josnList.Select(g=> g.Date).FirstOrDefault());
                    await _connection.ExecuteAsync(ProcedureNames.usp_InsertGlobalIndices, parameters, commandType: CommandType.StoredProcedure);
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

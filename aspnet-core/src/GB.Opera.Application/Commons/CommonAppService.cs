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
using Companies;

namespace Commons
{
    public class CommonAppService : ApplicationService, ICommonAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CommonAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CompStockMarketDto>> GetCompStockMarkets()
        {
            var data = (await _connection.QueryAsync<CompStockMarketDto>(sql: "usp_getCompStockMarkets", commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }

        public async Task<List<CompanyDto>> SearchCompanies(string param)
        {
            var sql = $@"SELECT * FROM Companies where Company like '%{param}%' or Ticker like '%{param}%'";

            var data = await _connection.QueryAsync<CompanyDto>(sql);
            return data.ToList();
        }

        public async Task<CompDropdownDto> GetCompMSectors(int marketID)
        {
            var reader = await _connection.QueryMultipleAsync("usp_getCompMSectors",
                            param: new { marketID = marketID },
                            commandType: CommandType.StoredProcedure);
            var output = new CompDropdownDto();
            output.MarketSectors = reader.Read<MarketSectorDto>().ToList();
            output.InternalCategories = reader.Read<InternalCategoryDto>().ToList();
            output.GBIndustrialGroups = reader.Read<GBIndustrialGroupDto>().ToList();
            output.Sectors = reader.Read<SectorDto>().ToList();
            output.CapSizes = reader.Read<CapSizeDto>().ToList();
            output.Currencies = reader.Read<CurrencyDto>().ToList();
            output.Industries = reader.Read<IndustryDto>().ToList();
            output.SubCurrencies = reader.Read<SubCurrencyDto>().ToList();

            return output;
        }



    }
}

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
using GB.Opera.GbFacts;

namespace Companies
{
    public class CompanyAppService : ApplicationService, ICompanyAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<CompanyDto>> GetCompanies(int sectorID, int stockMarketID)
        {
            try
            {
                var data = (await _connection.QueryAsync<CompanyDto>(sql: "usp_getCompanies",
                                param: new { StockMarketID = stockMarketID, SectorID = sectorID },
                                commandType: CommandType.StoredProcedure)).ToList();
                return data;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
       



    }
}

using Dapper;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Gb.Opera.GbFacts;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Volo.Abp.Data;

namespace Gb.Opera.GbFacts
{
    public class GbFactsAppService : ApplicationService, IGbFactAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public GbFactsAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }   

        public async Task<List<GbFactsDto>> GetGbFacts()
        {
            var sql = $@"SELECT Top 20 *
                              FROM
                                [GBFacts]";

            var data= await _connection.QueryAsync<GbFactsDto>(sql);
            return data.ToList();
        }

        public async Task<List<GbFactsDto>> GetGbFactsDataFromProcedure()
        {
            var data = (await _connection.QueryAsync<GbFactsDto>(sql: "GetGBFactsData", commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }



    }
}

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

namespace GbFacts
{
    public class GbFactAppService : ApplicationService, IGbFactAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public GbFactAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }   

        public async Task<List<GbFactDto>> GetGbFacts()
        {
            var sql = $@"SELECT Top 20 *
                              FROM
                                [GBFacts]";

            var data= await _connection.QueryAsync<GbFactDto>(sql);
            return data.ToList();
        }

        public async Task<List<GbFactListDto>> GetGbFactsDataFromProcedure()
        {
            var data = (await _connection.QueryAsync<GbFactListDto>(sql: "GetGBFactsData", commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }



    }
}

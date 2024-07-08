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

         

        public async Task<List<GbFactListDto>> GetGbFactsDataFromProcedure()
        { 
            var data = (await _connection.QueryAsync<GbFactListDto>(sql: "GetGBFactsData", commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }
        public async Task<List<GbFactListDto>> GetAllFactsMappings()
        {
            // Step 1: Execute the stored procedure and retrieve results using QueryMultipleAsync
            var results = await _connection.QueryMultipleAsync(
                sql: "usp_getAllFactsMappings",
                commandType: CommandType.StoredProcedure
            );

            // Step 2: Initialize a list to hold the final result
            var gbFactList = new List<GbFactListDto>();

            // Step 3: Read each result set and add to the final list
            // In this example, assuming there are two result sets of the same type
            while (!results.IsConsumed)
            {
                var resultSet = await results.ReadAsync<GbFactListDto>();
                gbFactList.AddRange(resultSet);
            }

            // Step 4: Return the combined list of results
            return gbFactList;
        }



    }
}

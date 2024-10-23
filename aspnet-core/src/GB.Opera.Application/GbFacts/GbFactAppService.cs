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
using GB.Opera.GbFacts;
using GB.Opera.constants;

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
            var data = (await _connection.QueryAsync<GbFactListDto>(sql: ProcedureNames.GetGBFactsData, commandType: CommandType.StoredProcedure)).ToList();

            return data;
        }
        public async Task<List<GbFactListDto>> GetAllFactsMappings()
        {
             
            var results = await _connection.QueryMultipleAsync(
                sql: "usp_getAllFactsMappings",
                commandType: CommandType.StoredProcedure
            );

      
            var gbFactList = new List<GbFactListDto>();

           
            while (!results.IsConsumed)
            {
                var resultSet = await results.ReadAsync<GbFactListDto>();
                gbFactList.AddRange(resultSet);
            }

           
            return gbFactList;
        }
        public GbFactsAccount SaveUpdate(GbFactsAccount gbFact)
        {

            var parameters = new
            {
                GBFactID = gbFact.GBFactID,
                ParentID = gbFact.ParentID,
                GBFact = gbFact.GBFact,
                AGBFact = gbFact.AGBFact,
                IsGBAccount = gbFact.IsGBAccount,
                IsTitle = gbFact.IsTitle
            };

            _connection.Execute(ProcedureNames.usp_AddUpdateGBFact, parameters, commandType: CommandType.StoredProcedure);

            return gbFact;
        }

        public async Task<List<GbFactsAccount>> GetgbfactByid(short GBFactID)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@GBFactID", GBFactID, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<GbFactsAccount>(
                sql: ProcedureNames.getGBAccounts_New,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }


    }
}

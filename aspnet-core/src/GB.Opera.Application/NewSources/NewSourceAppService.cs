using Dapper;
using GB.Opera.constants;
using GB.Opera.ProductServiceRaw;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.NewSources
{
    public  class NewSourceAppService : ApplicationService, INewSourceAppService
    {
         private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public NewSourceAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public NewSourceDto SaveUpdate(NewSourceDto source)
        {

            var parameters = new
            {
                SourceID = source.SourceID,
                Source = source.Source,
                ASource = source.ASource,
                IsEnglish = source.IsEnglish,
               
            };

            _connection.Execute(ProcedureNames.SaveOrUpdateNewsSource_New, parameters, commandType: CommandType.StoredProcedure);

            return source;
        }

        public async Task<List<NewSourceDto>> GetNewSourceByID(short Source)
        {
            // Define the parameters for the stored procedure
            var parameters = new DynamicParameters();
            parameters.Add("@SourceID", Source, DbType.Int16);

            // Execute the stored procedure and retrieve data using Dapper
            var data = await _connection.QueryAsync<NewSourceDto>(
                sql: ProcedureNames.USP_GetProductServiceRawByID,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            return data.ToList();
        }

        public async Task<List<NewSourceDto>> GetNewSource()
        {

            var parameters = new DynamicParameters();

            var data = await _connection.QueryAsync<NewSourceDto>(
                sql: ProcedureNames.usp_GetSource_new,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            // Return the data as a List
            return data.ToList();
        }
    }
}

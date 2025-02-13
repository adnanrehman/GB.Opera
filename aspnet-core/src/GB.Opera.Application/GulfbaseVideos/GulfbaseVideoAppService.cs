using Dapper;
using GB.Opera.AccountsClassifications;
using GB.Opera.constants;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;


namespace GB.Opera.GulfbaseVideos
{
    public  class GulfbaseVideoAppService : ApplicationService, IApplicationService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public GulfbaseVideoAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("DefaultForNews"));
        }

        public async Task CreateOrUpdateGulfbaseVideo(GulfbaseVideo video)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", video.Id);          
                parameters.Add("@Tag", video.Tag);        
                parameters.Add("@Width", video.Width);    
                parameters.Add("@Height", video.Height); 
                parameters.Add("@IsHome", video.IsHome);
                parameters.Add("@SortOrder", video.SortOrder);

                await _connection.ExecuteAsync(ProcedureNames.InsertOrUpdateGulfbaseVideo, parameters, commandType: CommandType.StoredProcedure);

            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                throw new Exception("Error in CreateOrUpdateGulfbaseVideo", ex);
            }
        }

        public async Task<List<GulfbaseVideo>> GetGulfbaseVideo()
        {
          
            var parameters = new DynamicParameters();
          
            var data = await _connection.QueryAsync<GulfbaseVideo>(
                sql: ProcedureNames.usp_getGulfbaseVideos,
                param: parameters,
                commandType: CommandType.StoredProcedure
            );

            // Return the data as a List
            return data.ToList();
        }




    }
}
 

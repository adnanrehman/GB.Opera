using Abp.Application.Services;
using Dapper;
using GB.Opera.constants;
using GbFacts;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GB.Opera.CountryProfile
{
    public class CountryProfileAppService : ApplicationService, ICountryProfileAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CountryProfileAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }
        public async Task<CountryProfileDto> GetCompanyProfile()
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getAllCountryProfiles, commandType: CommandType.StoredProcedure);
                var output = new CountryProfileDto
                {
                    CPsection = reader.Read<CPsection>().ToList(),
                    CountryProfiles = reader.Read<CountryProfiles>().ToList(),
                    CPSectionsFalse = reader.Read<CPSectionsFalse>().ToList(),
                    AssignSection = reader.Read<AssignSection>().ToList()
                };
                return output;
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                throw new ApplicationException("An error occurred while fetching the company profile.", ex);
            }
        }
       

    }
}

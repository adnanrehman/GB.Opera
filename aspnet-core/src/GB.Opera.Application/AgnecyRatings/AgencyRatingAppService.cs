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
using System.Reflection;
using System.ComponentModel.Design;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Security.Cryptography.X509Certificates;
using System.Xml.Linq;
using static Volo.Abp.UI.Navigation.DefaultMenuNames.Application;
using System.Text.RegularExpressions;
using CompanyMutualFundSettings;
using GB.Opera.Books;

namespace AgencyRatings
{
    public class AgencyRatingAppService : ApplicationService, IAgencyRatingAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public AgencyRatingAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<AgencyRatingDto> GetAgencyRatings(bool isCredit)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync("getAgenciesRatings",
                            param: new { IsCredit = isCredit },
                            commandType: CommandType.StoredProcedure);
                var output = new AgencyRatingDto();
                output.Agencies = reader.Read<AgencyDto>().ToList();
                output.Ratings = reader.Read<RatingDto>().ToList();
                return output;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<AgencyDto> CreateOrUpdateAgency(AgencyDto input)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@AgencyId", input.AgencyId);
                parameters.Add("@Agency", input.Agency);
                parameters.Add("@AAgency", input.AAgency);
                parameters.Add("@Introduction", input.Introduction);
                parameters.Add("@AIntroduction", input.AIntroduction);
                parameters.Add("@Website", input.Website);
                parameters.Add("@IsCredit", input.IsCredit);

                await _connection.ExecuteAsync("usp_InsertAgency", parameters, commandType: CommandType.StoredProcedure);

                return input;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<RatingDto> CreateOrUpdateRating(RatingDto input)
        {
            try
            {
                var parameters = new DynamicParameters();
                //parameters.Add("@RatingId", input.RatingId);
                parameters.Add("@Rating", input.Rating);
                parameters.Add("@ARating", input.ARating);
                parameters.Add("@Brief", input.Brief);
                parameters.Add("@ABrief", input.ABrief);
                parameters.Add("@IsCredit", input.IsCredit);

                await _connection.ExecuteAsync("usp_InsertRating", parameters, commandType: CommandType.StoredProcedure);

                return input;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

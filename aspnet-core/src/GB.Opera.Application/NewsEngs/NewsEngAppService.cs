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
using GB.Opera.Books;
using System.Diagnostics.Metrics;

namespace NewsEngs
{
    public class NewsEngAppService : ApplicationService, INewsEngAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public NewsEngAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<List<NewsEngDto>> GetNewsEngs()
        {
            try
            {
                var sql = $@"select top 100 NewsID,GCCID,NewsCategoryID,CompanyID,[Date],Title,SubTitle,Source,[Description],IsHome,GulfBaseSectorID,Islamic,ForSocialNetworks,IsGulfbaseNews from News_En order by NewsID desc";

                var data = await _connection.QueryAsync<NewsEngDto>(sql);
                return data.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<NewsEngDto> CreateOrUpdateNewsEng(NewsEngDto input)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@LangID", input.LangID);
                parameters.Add("@GCCID", input.GCCID);
                parameters.Add("@NewsID", input.NewsID);
                parameters.Add("@NewsCategoryID", input.NewsCategoryID);
                parameters.Add("@CompanyID", input.CompanyID);
                parameters.Add("@Date", input.Date);
                parameters.Add("@Title", input.Title);
                parameters.Add("@SubTitle", input.SubTitle);
                parameters.Add("@Source", input.Source);
                parameters.Add("@Description", input.Description);
                parameters.Add("@IsHome", input.IsHome);
               parameters.Add("@GulfBaseSectorID", input.gulfBaseSectorID);
                parameters.Add("@Islamic", input.Islamic);
                parameters.Add("@ForSocialNetworks", input.ForSocialNetworks);
                parameters.Add("@IsGulfbaseNews", input.IsGulfbaseNews);

                await _connection.ExecuteAsync("InsertNews", parameters, commandType: CommandType.StoredProcedure);

                return input;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

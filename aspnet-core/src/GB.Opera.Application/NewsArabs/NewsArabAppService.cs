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

namespace NewsArabs
{
    //public class NewsArabAppService : ApplicationService, INewsArabAppService
    //{
    //    private readonly IConfiguration _configuration;
    //    private readonly SqlConnection _connection;
    //    public NewsArabAppService(IConfiguration configuration)
    //    {
    //        _configuration = configuration;
    //        _connection = new SqlConnection(configuration.GetConnectionString("Default"));
    //    }

    //    public async Task<List<NewsArabDto>> GetNewsArabs()
    //    {
    //        try
    //        {
    //            var sql = $@"select top 10 NewsID,GCCID,NewsCategoryID,CompanyID,[Date],ATitle,ASubTitle,ASource,[ADescription],IsHome,GulfBaseSectorID,Islamic from News_Ar where NewsCategoryID = 1 order by NewsID desc";

    //            var data = await _connection.QueryAsync<NewsArabDto>(sql);
    //            return data.ToList();
    //        }
    //        catch (Exception ex)
    //        {

    //            throw ex;
    //        }

    //    }

    //    public async Task<NewsArabDto> CreateOrUpdateNewsArab(NewsArabDto input)
    //    {
    //        try
    //        {
    //            var parameters = new DynamicParameters();
    //            parameters.Add("@GCCID", input.GCCID);
    //            parameters.Add("@NewsCategoryID", input.NewsCategoryID);
    //            parameters.Add("@CompanyID", input.CompanyID);
    //            parameters.Add("@Date", input.Date);
    //            parameters.Add("@Title", input.ATitle);
    //            parameters.Add("@ASubTitle", input.ASubTitle);
    //            parameters.Add("@Source", input.ASource);
    //            parameters.Add("@Description", input.ADescription);
    //            parameters.Add("@IsHome", input.IsHome);
    //            parameters.Add("@GulfBaseSectorID", input.gulfBaseSectorID);
    //            parameters.Add("@Islamic", input.Islamic);

    //            await _connection.ExecuteAsync("InsertNews", parameters, commandType: CommandType.StoredProcedure);

    //            return input;
    //        }
    //        catch (Exception ex)
    //        {
    //            throw ex;
    //        }
    //    }


    //}
}

﻿using Dapper;
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
using GB.Opera.News;
using System.Globalization;

namespace News
{
    public class NewsAppService : ApplicationService, INewsAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public NewsAppService(IConfiguration configuration, IConfiguration Newsconnection)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("DefaultForNews"));
        }

        //LangId , News Id
        public async Task<List<NewsDto>> GetNews(bool langId,int newsId)
        {
            try
            {
                var sql = "";
                if (langId)
                {
                    sql = $@"select top 100 NewsID,GCCID,NewsCategoryID,CompanyID,[Date],Title,SubTitle,Source,[Description],IsHome,GulfBaseSectorID,Islamic,ForSocialNetworks,IsGulfbaseNews,NewsImage,IsHotNews from News_En  WHERE (NewsId= {newsId} OR {newsId} =0) order by  NewsID desc";
                }
                else
                {
                    sql = $@"select top 100 NewsID,GCCID,NewsCategoryID,CompanyID,[Date],ATitle As Title,ASubTitle As SubTitle,ASource As Source,[ADescription] As Description,IsHome,GulfBaseSectorID,Islamic,ForSocialNetworks,IsGulfbaseNews,NewsImage,IsHotNews from News_Ar WHERE (NewsId= {newsId} OR {newsId} =0) order by NewsID desc";
                }               

                var data = await _connection.QueryAsync<NewsDto>(sql);
                return data.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<NewsDto> CreateOrUpdateNews(NewsDto input)
        {
            try
            {
                TimeSpan time = DateTime.Now.TimeOfDay;
                input.Date = Convert.ToDateTime(input.Date.Value.ToString("yyyy-MM-dd" + " " + time.ToString()));
                var date = input.Date.Value.ToString("yyyy-MM-dd");
                var parameters = new DynamicParameters();
                parameters.Add("@LangID", input.LangID);
                parameters.Add("@NewsID", input.NewsID);
                parameters.Add("@GCCID", input.GCCID);
                parameters.Add("@NewsCategoryID", input.NewsCategoryID);
                parameters.Add("@CompanyID", input.CompanyID == 0? null : input.CompanyID);
                parameters.Add("@Date", date);
                parameters.Add("@Title", input.Title);
                parameters.Add("@SubTitle", input.SubTitle);
                parameters.Add("@Source", input.Source);
                parameters.Add("@Description", input.Description);
                parameters.Add("@IsHome", input.IsHome);
                parameters.Add("@Islamic", input.Islamic);
                parameters.Add("@ForSocialNetworks", input.ForSocialNetworks);
                parameters.Add("@IsGulfbaseNews", input.IsGulfbaseNews);
                parameters.Add("@NewsImage", input.NewsImage);
                parameters.Add("@IsHotNews", input.IsHotNews);
                parameters.Add("@GulfBaseSectorID", 0);
                parameters.Add("@IsApproved", input.IsApproved);

                await _connection.ExecuteAsync("USP_GBN_InsertUpdateNews_New", parameters, commandType: CommandType.StoredProcedure);

                return input;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteNews(bool langId, int newsId)
        {
            try
            {
                var sql = "";
                if (langId)
                {
                    sql = $@"delete from News_En  WHERE NewsId= {newsId}";
                }
                else
                {
                    sql = $@"delete from News_Ar  WHERE NewsId= {newsId}";
                }

                await _connection.QueryAsync(sql);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<List<NewsSourceDto>> GetSource(  int newsId)
        {
            try
            {
                var sql = "";
                
                    sql = $@"Select * from NewsSource  WHERE (IsEnglish= {newsId} ) AND Source is NOT null order by Source Asc ";
               
                

                var data = await _connection.QueryAsync<NewsSourceDto>(sql);
                return data.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


    }
}

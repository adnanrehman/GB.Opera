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

namespace CompanyMutualFundSettings
{
    public class CompanyMutualFundSettingAppService : ApplicationService, ICompanyMutualFundSettingAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyMutualFundSettingAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("DefaultForNews"));
        }

        public async Task<CompanyMutualFundSettingDropdownDto> GetCompanyMutualFundSettings()
        {
            try
            {
                var output = new CompanyMutualFundSettingDropdownDto();
                output.AssetsAllocations = _connection.Query<AssetsAllocationDto>("SELECT * FROM AssetsAllocations").ToList();
                output.Benchmarks = _connection.Query<BenchmarkDto>("SELECT   * FROM  FundBenchmarks").ToList();
                output.MFCategories = _connection.Query<MFCategoryDto>("SELECT * FROM MFCategories").ToList();
                output.MFClassifications = _connection.Query<MFClassificationDto>("SELECT * FROM MFClassifications").ToList();
                output.GeoDiversifications = _connection.Query<GeoDiversificationDto>("SELECT * FROM GeoDiversifications").ToList();
                output.MFListings = _connection.Query<MFListingDto>("SELECT * FROM MFListings").ToList();
                output.MajorInvestments = _connection.Query<MajorInvestmentDto>("SELECT * FROM MajorInvestments").ToList();
                output.PortfolioTypes = _connection.Query<PortfolioTypeDto>("SELECT * FROM PortfolioTypes").ToList();
                output.MFRisks = _connection.Query<MFRiskDto>("SELECT * FROM MFRisks").ToList();
                output.SectorDiversifications = _connection.Query<SectorDiversificationDto>("SELECT * FROM SectorDiversifications").ToList();
                output.MFSubCategories = _connection.Query<MFSubCategoryDto>("SELECT * FROM MFSubCategories").ToList();
                return output;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


    }
}

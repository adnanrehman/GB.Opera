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

namespace CompanyMutualFunds
{
    public class CompanyMutualFundAppService : ApplicationService, ICompanyMutualFundAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyMutualFundAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<GetCompanyMutualFundsDto> GetCompanyMutualFunds(int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync("[usp_getCompanyMutualFunds]",
                    param: new { CompanyID = companyID },
                commandType: CommandType.StoredProcedure);
                var output = new GetCompanyMutualFundsDto();
                output.CompanyMutualFunds = reader.Read<CompanyMutualFundDto>().ToList();
                output.MFundGeoDiversPercents = reader.Read<MFundGeoDiversPercentDto>().ToList();
                output.MFundAssestAllocsPercents = reader.Read<MFundAssestAllocsPercentDto>().ToList();
                output.MFundMajorInvestPercents = reader.Read<MFundMajorInvestPercentDto>().ToList();
                output.MFundSectorDiversPercents = reader.Read<MFundSectorDiversPercentDto>().ToList();
                return output;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<CompanyMutualFundDto> CreateOrUpdateCompanyMutualFund(CompanyMutualFundDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@MFundID", model.@MFundID);
                parameters.Add("@CompanyID", model.@CompanyID);
                parameters.Add("@Name", model.@Name);
                parameters.Add("@AName", model.@AName);
                parameters.Add("@ShortName", model.@ShortName);
                parameters.Add("@AShortName", model.@AShortName);
                parameters.Add("@Manager", model.@Manager);
                parameters.Add("@AManager", model.@AManager);
                parameters.Add("@CurrencyID", model.@CurrencyID);
                parameters.Add("@CategoryID", model.@CategoryID);
                parameters.Add("@SubCategoryID", model.@SubCategoryID);
                parameters.Add("@ClassificationID", model.@ClassificationID);
                parameters.Add("@ListingID", model.@ListingID);
                parameters.Add("@ManagementFee", model.@ManagementFee);
                parameters.Add("@ManagementFeeType", model.@ManagementFeeType);
                parameters.Add("@AManagementFeeType", model.@AManagementFeeType);
                parameters.Add("@FeeDescription", model.@FeeDescription);
                parameters.Add("@AFeeDescription", model.@AFeeDescription);
                parameters.Add("@DateOfInception", model.@DateOfInception);
                parameters.Add("@PriceAtInception", model.@PriceAtInception);
                parameters.Add("@MinimumInitialSubscription", model.@MinimumInitialSubscription);
                parameters.Add("@AdditionalSubscription", model.@AdditionalSubscription);
                parameters.Add("@PortfolioTypeID", model.@PortfolioTypeID);
                parameters.Add("@InvestmentManager", model.@InvestmentManager);
                parameters.Add("@AInvestmentManager", model.@AInvestmentManager);
                parameters.Add("@Administrator", model.@Administrator);
                parameters.Add("@AAdministrator", model.@AAdministrator);
                parameters.Add("@Auditor", model.@Auditor);
                parameters.Add("@AAuditor", model.@AAuditor);
                parameters.Add("@Custodian", model.@Custodian);
                parameters.Add("@ACustodian", model.@ACustodian);
                parameters.Add("@ManagementTeam", model.@ManagementTeam);
                parameters.Add("@AManagementTeam", model.@AManagementTeam);
                parameters.Add("@SubscriptionDeadLine", model.@SubscriptionDeadLine);
                parameters.Add("@ASubscriptionDeadLine", model.@ASubscriptionDeadLine);
                parameters.Add("@RedemptionDeadLine", model.@RedemptionDeadLine);
                parameters.Add("@ARedemptionDeadLine", model.@ARedemptionDeadLine);
                parameters.Add("@ValuationDate", model.@ValuationDate);
                parameters.Add("@AValuationDate", model.@AValuationDate);
                parameters.Add("@AnnounceOn", model.@AnnounceOn);
                parameters.Add("@AAnnounceOn", model.@AAnnounceOn);
                parameters.Add("@RiskID", model.@RiskID);
                parameters.Add("@FundAssets", model.@FundAssets);
                parameters.Add("@FundBenchMark", model.@FundBenchMark);
                parameters.Add("@AFundBenchMark", model.@AFundBenchMark);
                parameters.Add("@FundObjective", model.@FundObjective);
                parameters.Add("@AFundObjective", model.@AFundObjective);
                parameters.Add("@InvestmentPolicy", model.@InvestmentPolicy);
                parameters.Add("@AInvestmentPolicy", model.@AInvestmentPolicy);
                parameters.Add("@RiskProfile", model.@RiskProfile);
                parameters.Add("@ARiskProfile", model.@ARiskProfile);
                parameters.Add("@FundsBenefits", model.@FundsBenefits);
                parameters.Add("@AFundsBenefits", model.@AFundsBenefits);
                parameters.Add("@FundsComponents", model.@FundsComponents);
                parameters.Add("@AFundsComponents", model.@AFundsComponents);
                parameters.Add("@FundManagerComments", model.@FundManagerComments);
                parameters.Add("@AFundManagerComments", model.@AFundManagerComments);
                parameters.Add("@UnitPriceCalculation", model.@UnitPriceCalculation);
                parameters.Add("@AUnitPriceCalculation", model.@AUnitPriceCalculation);
                parameters.Add("@BenchmarkID", model.@BenchmarkID);
                parameters.Add("@City", model.@City);
                parameters.Add("@ACity", model.@ACity);
                parameters.Add("@StreetAddress", model.@StreetAddress);
                parameters.Add("@AStreetAddress", model.@AStreetAddress);
                parameters.Add("@Website", model.@Website);
                parameters.Add("@Email", model.@Email);
                parameters.Add("@POBox", model.@POBox);
                parameters.Add("@APOBox", model.@APOBox);
                parameters.Add("@PinCode", model.@PinCode);
                parameters.Add("@Telephone", model.@Telephone);
                parameters.Add("@Cell", model.@Cell);
                parameters.Add("@Fax", model.@Fax);
                parameters.Add("@Telex", model.@Telex);
                parameters.Add("@ATelex", model.@ATelex);
                parameters.Add("@SearchTags", model.@SearchTags);
                parameters.Add("@ASearchTags", model.@ASearchTags);
                parameters.Add("@PageDescription", model.@PageDescription);
                parameters.Add("@APageDescription", model.@APageDescription);
                parameters.Add("@CreationDate", DateTime.Now);
                parameters.Add("@IsActive", true);


                await _connection.ExecuteAsync("[usp_InsertUpdateMutualFunds]", parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}

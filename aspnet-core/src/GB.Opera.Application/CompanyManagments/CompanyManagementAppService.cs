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
using CompanyManagements;
using System.Drawing;
using System.Runtime.ConstrainedExecution;
using GB.Opera.constants;

namespace CompanyManagements
{
    public class CompanyManagmentAppService : ApplicationService, ICompanyManagementAppService
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;
        public CompanyManagmentAppService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(configuration.GetConnectionString("Default"));
        }

        public async Task<CompanyManagementDto> GetCompaniesManagement(int companyID)
        {
            try
            {
                var reader = await _connection.QueryMultipleAsync(ProcedureNames.usp_getCompaniesManagement,
                            param: new { CompanyID = companyID },
                            commandType: CommandType.StoredProcedure);
                var output = new CompanyManagementDto();
                output.Managements = reader.Read<ManagementDto>().ToList();
                output.SeniorManagements = reader.Read<SeniorManagementDto>().ToList();
                output.BoardMembers = reader.Read<BoardMemberDto>().ToList();
                output.Auditors = reader.Read<AuditorDto>().ToList();
                output.Branches = reader.Read<BranchDto>().ToList();
                output.CompanyFinancialOverviews = reader.Read<CompanyFinancialOverviewDto>().ToList();
                output.ContactInformations = reader.Read<ContactInformationDto>().ToList();
                output.CompanyProjects = reader.Read<CompanyProjectDto>().ToList();
                output.ProjectStatuses = reader.Read<ProjectStatusDto>().ToList();

                return output;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<ManagementDto> CreateOrUpdateCompanyManagement(ManagementDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ManagementID", model.ManagementID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Chairman", model.Chairman);
                parameters.Add("@AChairman", model.AChairman);
                parameters.Add("@HonoraryChairman", model.HonoraryChairman);
                parameters.Add("@AHonoraryChairman", model.AHonoraryChairman);
                parameters.Add("@ViceChairman", model.ViceChairman);
                parameters.Add("@AViceChairman", model.AViceChairman);
                parameters.Add("@President", model.President);
                parameters.Add("@APresident", model.APresident);
                parameters.Add("@HonoraryPresident", model.HonoraryPresident);
                parameters.Add("@AHonoraryPresident", model.AHonoraryPresident);
                parameters.Add("@VicePresident", model.VicePresident);
                parameters.Add("@AVicePresident", model.AVicePresident);
                parameters.Add("@ManagingDirector", model.ManagingDirector);
                parameters.Add("@AManagingDirector", model.AManagingDirector);
                parameters.Add("@DeputyManagingDirector", model.DeputyManagingDirector);
                parameters.Add("@ADeputyManagingDirector", model.ADeputyManagingDirector);
                parameters.Add("@GeneralManager", model.GeneralManager);
                parameters.Add("@AGeneralManager", model.AGeneralManager);
                parameters.Add("@CEO", model.CEO);
                parameters.Add("@ACEO", model.ACEO);
                parameters.Add("@Since", model.Since);
                parameters.Add("@Till", model.Till);
                parameters.Add("@CreationDate", model.CreationDate);
                parameters.Add("@IsActive", model.IsActive);
                parameters.Add("@GulfbaseUpdateDate", model.GulfbaseUpdateDate);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertManagements, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<SeniorManagementDto> CreateOrUpdateSeniorManagement(SeniorManagementDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@SeniorManagementID", model.SeniorManagementID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Title", model.Title);
                parameters.Add("@ATitle", model.ATitle);
                parameters.Add("@SeniorManagement", model.SeniorManagement);
                parameters.Add("@ASeniorManagement", model.ASeniorManagement);
                parameters.Add("@Since", model.Since);
                parameters.Add("@Till", model.Till);
                parameters.Add("@IsActive", model.IsActive);
                parameters.Add("@GulfbaseUpdateDate", model.GulfbaseUpdateDate);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertSnrManagement, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<AuditorDto> CreateOrUpdateAuditors(AuditorDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@AuditorID", model.AuditorID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Title", model.Title);
                parameters.Add("@ATitle", model.ATitle);
                parameters.Add("@Auditor", model.Auditor);
                parameters.Add("@AAuditor", model.AAuditor);
                parameters.Add("@Since", model.Since);
                parameters.Add("@Till", model.Till);
                parameters.Add("@IsActive", true);
                parameters.Add("@GulfbaseUpdateDate", model.GulfbaseUpdateDate);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertAuditors, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<BoardMemberDto> CreateOrUpdateBMembers(BoardMemberDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@BoardMemberID", model.BoardMemberID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@Title", model.Title);
                parameters.Add("@ATitle", model.ATitle);
                parameters.Add("@BoardMember", model.BoardMember);
                parameters.Add("@ABoardMember", model.ABoardMember);
                parameters.Add("@Since", model.Since);
                parameters.Add("@Till", model.Till);
                parameters.Add("@IsActive", true);
                parameters.Add("@GulfbaseUpdateDate", model.GulfbaseUpdateDate);
                parameters.Add("@CustomOrder", model.CustomOrder);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertBMembers, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<BranchDto> CreateOrUpdateBranches(BranchDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@BranchID", model.BranchID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@BranchName", model.BranchName);
                parameters.Add("@ABranchName", model.ABranchName);
                parameters.Add("@City", model.City);
                parameters.Add("@ACity", model.ACity);
                parameters.Add("@StreetAddress", model.StreetAddress);
                parameters.Add("@AStreetAddress", model.AStreetAddress);
                parameters.Add("@Website", model.Website);
                parameters.Add("@Email", model.Email);
                parameters.Add("@POBox", model.POBox);
                parameters.Add("@APOBox", model.APOBox);
                parameters.Add("@PinCode", model.PinCode);
                parameters.Add("@Telex", model.Telex);
                parameters.Add("@ATelex", model.ATelex);
                parameters.Add("@Telephone", model.Telephone);
                parameters.Add("@Cell", model.Cell);
                parameters.Add("@Fax", model.Fax);
                parameters.Add("@OpeningDate", model.OpeningDate);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@CreationDate", model.CreationDate);
                parameters.Add("@IsActive", true);
                parameters.Add("@GulfbaseUpdateDate", model.GulfbaseUpdateDate);
                parameters.Add("@Region", model.Region);
                parameters.Add("@ARegion", model.ARegion);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertBranches, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CompanyFinancialOverviewDto> CreateOrUpdateOverview(CompanyFinancialOverviewDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@OverviewID", model.OverviewID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@ListedDate", model.ListedDate);
                parameters.Add("@Employees", model.Employees);
                parameters.Add("@InitialCapital", model.InitialCapital);
                parameters.Add("@AuthorizedCapital", model.AuthorizedCapital);
                parameters.Add("@SubscribedCapital", model.SubscribedCapital);
                parameters.Add("@PaidupCapital", model.PaidupCapital);
                parameters.Add("@OutstandingShares", model.OutstandingShares);
                parameters.Add("@ParValuePerShare", model.ParValuePerShare);
                parameters.Add("@TreasuryStocks", model.TreasuryStocks);
                parameters.Add("@Beta", model.Beta);
                parameters.Add("@CreationDate", model.CreationDate);
                parameters.Add("@IsActive", true);
                parameters.Add("@GulfbaseUpdateDate", model.GulfbaseUpdateDate);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertOverview, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ContactInformationDto> CreateOrUpdateContacts(ContactInformationDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ContactInfoID", model.ContactInfoID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@City", model.City);
                parameters.Add("@ACity", model.ACity);
                parameters.Add("@StreetAddress", model.StreetAddress);
                parameters.Add("@AStreetAddress", model.AStreetAddress);
                parameters.Add("@Website", model.Website);
                parameters.Add("@Email", model.Email);
                parameters.Add("@POBox", model.POBox);
                parameters.Add("@APOBox", model.APOBox);
                parameters.Add("@PinCode", model.PinCode);
                parameters.Add("@Telex", model.Telex);
                parameters.Add("@ATelex", model.ATelex);
                parameters.Add("@Telephone", model.Telephone);
                parameters.Add("@Cell", model.Cell);
                parameters.Add("@Fax", model.Fax);
                parameters.Add("@CreationDate", model.CreationDate);
                parameters.Add("@IsActive", true);
                parameters.Add("@GulfbaseUpdateDate", model.GulfbaseUpdateDate);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertContacts, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CompanyProjectDto> CreateOrUpdateCompanyProjects(CompanyProjectDto model)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ProjectID", model.ProjectID);
                parameters.Add("@CompanyID", model.CompanyID);
                parameters.Add("@ProjectStatus", model.ProjectStatus);
                parameters.Add("@ProjectStatusID", model.ProjectStatusID);
                parameters.Add("@StartDate", model.StartDate);
                parameters.Add("@EndDate", model.EndDate);
                parameters.Add("@Name", model.Name);
                parameters.Add("@AName", model.AName);
                parameters.Add("@Description", model.Description);
                parameters.Add("@ADescription", model.ADescription);
                parameters.Add("@Active", true);

                await _connection.ExecuteAsync(ProcedureNames.usp_InsertCompanyProjects, parameters, commandType: CommandType.StoredProcedure);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}

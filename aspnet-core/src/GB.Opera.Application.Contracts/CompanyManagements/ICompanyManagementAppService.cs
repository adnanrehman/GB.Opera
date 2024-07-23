using CompanyManagements;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyManagements
{
    public interface ICompanyManagementAppService : IApplicationService
    {
        Task<CompanyManagementDto> GetCompaniesManagement(int companyID);
        Task<ManagementDto> CreateOrUpdateCompanyManagement(ManagementDto model);
        Task<SeniorManagementDto> CreateOrUpdateSeniorManagement(SeniorManagementDto model);
        Task<AuditorDto> CreateOrUpdateAuditors(AuditorDto model);
        Task<BoardMemberDto> CreateOrUpdateBMembers(BoardMemberDto model);
        Task<BranchDto> CreateOrUpdateBranches(BranchDto model);
        Task<CompanyFinancialOverviewDto> CreateOrUpdateOverview(CompanyFinancialOverviewDto model);
        Task<ContactInformationDto> CreateOrUpdateContacts(ContactInformationDto model);
        Task<CompanyProjectDto> CreateOrUpdateCompanyProjects(CompanyProjectDto model);

    }
}

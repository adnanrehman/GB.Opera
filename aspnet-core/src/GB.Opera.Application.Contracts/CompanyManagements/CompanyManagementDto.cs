using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompanyManagements
{
    public class CompanyManagementDto
    {
        public CompanyManagementDto()
        {
            Managements = new List<ManagementDto>();
            SeniorManagements = new List<SeniorManagementDto>();
            BoardMembers = new List<BoardMemberDto>();
            Auditors = new List<AuditorDto>();
            Branches = new List<BranchDto>();
            CompanyFinancialOverviews = new List<CompanyFinancialOverviewDto>();
            ContactInformations = new List<ContactInformationDto>();
            CompanyProjects = new List<CompanyProjectDto>();
            ProjectStatuses = new List<ProjectStatusDto>();
        }
        public List<ManagementDto> Managements { get; set; }
        public List<SeniorManagementDto> SeniorManagements { get; set; }
        public List<BoardMemberDto> BoardMembers { get; set; }
        public List<AuditorDto> Auditors { get; set; }
        public List<BranchDto> Branches { get; set; }
        public List<CompanyFinancialOverviewDto> CompanyFinancialOverviews { get; set; }
        public List<ContactInformationDto> ContactInformations { get; set; }
        public List<CompanyProjectDto> CompanyProjects { get; set; }
        public List<ProjectStatusDto> ProjectStatuses { get; set; }
    }
}

using CompanyManagements;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CompanyOwnerships
{
    public interface ICompanyOwnershipAppService : IApplicationService
    {
        Task<CompanyOwnershipDto> GetRelatedInformations(int companyID);
        Task<SubsidiaryDto> CreateOrUpdateSubsidiary(SubsidiaryDto model);
        Task<SubsCompUpdDto> CreateOrUpdateSubsCompUpdate(SubsCompUpdDto model);
        Task<SisterCompanyDto> CreateOrUpdateSisterCompany(SisterCompanyDto model);
        Task<CompanyProductDto> CreateOrUpdateCompanyProduct(CompanyProductDto model);
        Task<CompanyRawMaterialDto> CreateOrUpdateRawMaterial(CompanyRawMaterialDto model);
        Task<CompanyFIPDto> CreateOrUpdateCompanyFIP(CompanyFIPDto model);
        Task<MiscNotesDto> CreateOrUpdateMiscNote(MiscNotesDto model);

        public   Task DeleteSubsidiaries(Int16 SubsCompUpdID);

        public Task Deletesistercompany(Int16 SisterCompanyID);

        public Task DeleteCompanyProducts(Int16 CompanyProductID);
        public   Task DelteCompanyRawMaterials(Int16 RawMaterialID);

        public Task DeleteForeignInvestmentPermitted(Int16 FIPID);
        public Task DeleteMiscNotes(Int16 MiscNotesID);

    }
}

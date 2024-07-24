using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CorporateAnnouncements
{
    public interface ICorporateAnnouncementAppService : IApplicationService
    {
        Task<List<CorporateAnnouncementDto>> GetCorporateAnnouncements(int companyID);
        Task<CorporateAnnouncementDto> CreateOrUpdateCorporateAnnouncement(CorporateAnnouncementDto model);
        Task DeleteCorporateAnnouncement(Int64 corporateAnnouncementID);

    }
}

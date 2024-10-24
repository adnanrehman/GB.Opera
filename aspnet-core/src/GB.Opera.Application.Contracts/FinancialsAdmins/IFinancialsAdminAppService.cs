using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace FinancialsAdmins
{
    public interface IFinancialsAdminAppService : IApplicationService
    {
        Task<NewFinancialReviewOutputDto> GetNewFinancialReviews(int companyID);
        Task UpdateAdminFinancials(NewReviewFinancialDto input);
        Task UpdateFinancialRateChanges(long financialId, decimal rate);
    }
}

using Entry;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Reviewers
{
    public interface IReviewerAppService : IApplicationService
    {
        Task<List<StatusFinancialsDto>> GetStatusFinancials(Guid userId);
        Task<ReviewReportOutputDto> GetReviewReport(int financialsID);

    }
}


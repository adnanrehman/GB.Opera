using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Entry
{
    public interface IEntryAppService : IApplicationService
    {
        Task<List<StatusFinancialsDto>> GetStatusFinancials(Guid userId);
        Task InsertUpdateFinancialValues(List<FinancialsDetailDto> list);
        Task InsertUpdateFinancialCommentsStatus(List<FinancialsDetailDto> list, Guid userID);
        Task InsertUpdateComitChanges(AsofDatesFinancialDto dto, Guid userID);

    }
}


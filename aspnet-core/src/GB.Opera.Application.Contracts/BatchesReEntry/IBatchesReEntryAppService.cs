using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BatchesReEntry
{
    public interface IBatchesReEntryAppService : IApplicationService
    {
        Task<List<BatchesReEntryDto>> GetBatchesReEntry(Guid userId);
        Task<List<BatchesESDFactsMappingDto>> GetBatchesForReEntry(int batchID);
        Task UpdateBatchStatus(BatchStatusUpdateDto input);

    }
}


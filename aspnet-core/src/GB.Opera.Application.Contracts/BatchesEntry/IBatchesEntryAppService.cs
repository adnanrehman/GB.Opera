using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace GB.Opera.BatchesEntry
{
    public  interface IBatchesEntryAppService
    {
        public  Task<List<BatchesEntryDto>> GetBatchesEntry(Guid userId);
        public Task<List<ESDFactsMappings>> getESDFactsMappingsYearly(Int64 BatchID, Int64 BatchESDfactID);

        public   Task InsertBatchesEntries(List<BatchesEntries> list);
    }
}

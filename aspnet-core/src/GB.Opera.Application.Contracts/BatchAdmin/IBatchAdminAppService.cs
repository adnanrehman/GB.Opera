using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace GB.Opera.BatchAdmin
{
    public  interface IBatchAdminAppService
    {
        public Task<BatchAdminDto> CountriesForBatches();
        public Task<List<SearchBatches>> GetBatchesEntry(Int16 BatchID);

        public Task<SearchBatches> InsertBatchesadmin(SearchBatches list);
    }
}

using Commons;
using GB.Opera.BatchAdmin;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace UploadBatch
{
    public  interface IUploadBatchAppService
    {
        public Task<BatchAdminDto> CountriesForBatches();

        Task<List<ESDFactDto>> GetCountriesFactsTitles(string country);

        public Task<UploadBatchDto> InsertBatch(UploadBatchDto input);

    }
}

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.Uploads
{
    public  interface IUploadAppService : IApplicationService
    {
        public Task<UploadwithHasDtos> UploadwithHasDtos(int MarketID, int SectorID);
        public Task<List<Users>> _getEntryReEntryUsers();
        public Task<List<UploadFinancialListDto>> GetFinancialsBycompanyId(int CompanyID);
        Task CreateUploadFinancial(UploadFinancials input);

        public   Task<string> Checkfinancialyear(string year, Int16 QPeriodID, Int16 CompanyID);
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.Uploads
{
    public  interface IUpload : IApplicationService
    {
        public Task<UploadwithHasDtos> UploadwithHasDtos(int MarketID, int SectorID);
        public   Task<List<Users>> _getEntryReEntryUsers();
        public   Task<List<UploadFinancials>> GetFinancialsBycompanyId(int CompanyID);
    }
}

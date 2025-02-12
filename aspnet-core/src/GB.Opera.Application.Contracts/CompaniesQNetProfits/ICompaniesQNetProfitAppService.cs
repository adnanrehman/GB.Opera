using CompaniesQNetProfits;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.CompaniesQNetProfits
{
    public interface ICompaniesQNetProfitAppService : IApplicationService
    {
        Task<CompaniesQNetProfitListDto> GetCompaniesQNetProfits(int companyID);
        Task InsertUpdateCalculateCompQuartersNetProfit(CompaniesQNetProfitDto input);

        public Task DeleteCompQuartersNetProfit(Int64 CompQNProfitID);

       
    }
}

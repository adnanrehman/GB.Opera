using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace GbFacts
{
    public interface IGbFactAppService : IApplicationService
    {
        Task<List<GbFactDto>> GetGbFacts();
        Task<List<GbFactListDto>> GetGbFactsDataFromProcedure();

    }
}

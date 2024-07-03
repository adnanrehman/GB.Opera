using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Gb.Opera.GbFacts
{
    public interface IGbFactAppService : IApplicationService
    {
        Task<List<GbFactsDto>> GetGbFacts();
        Task<List<GbFactsDto>> GetGbFactsDataFromProcedure();

    }
}

using Commons;
using EconomicAndStateFacts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace EconomicAndStateFacts
{
    public interface IEconomicAndStateFactAppService : IApplicationService
    {
        public Task<List<ESDFactDto>> GetAllESDFactMappings();

        public ESDFactModel SaveUpdateESDFact(ESDFactModel input);


        public Task<List<ESDFactModel>> GetESDFactbyId(short ESDFactID);

        public Task<int> DeletESDFactById(short ESDFactID);
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.AccountsClassifications
{
    public interface IAccountClassificationAppService : IApplicationService
    {
        public Task<List<ACFactsDtos>> GetAllACFactsMappings();
        public GbAcFactsAccount SaveUpdateAacFact(GbAcFactsAccount gbAcFactsAccount);

        public Task<List<GbAcFactsAccount>> GetAacfactByid(short ACFactId);

        public Task<int> DeleteAacfactById(short ACFactId);

        public IEnumerable<GbAcFactsAccount> SaveUpdateAacFacts(IEnumerable<GbAcFactsAccount> gbAcFactsAccounts);

    }
}

using GB.Opera.GbFacts;
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
        public   Task<List<GbFactListDto>> GetGbFactsDataFromProcedure();

        public   Task<List<GbFactListDto>> GetAllFactsMappings();

        public GbFactsAccount SaveUpdate(GbFactsAccount gbFact);
        GbFactsAccount RenameFactByMenu(GbFactsAccount gbFact, int companyID);


		public Task<List<GbFactsAccount>> GetgbfactByid(short GBFactID);

        public Task<List<GbFactsAccount>> SearchGbFacts(string param);


    }
}

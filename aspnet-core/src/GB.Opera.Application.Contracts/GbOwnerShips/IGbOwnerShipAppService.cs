using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace GB.Opera.GbOwnerShips
{
    public interface IGbOwnerShipAppService : IApplicationService
    {
        public   Task<List<GbOwnerShip>> GetAllFactsOwnershipMappings();

        public GbOwnerShip SaveUpdateGbOwnerShip(GbOwnerShip gbOwnerShip);


        public   Task<List<GbOwnerShip>> GetGBOwnershipbyId(short GBOwnershipID);

        public Task<int> DeletGBOwnershipById(short GBOwnershipID);
    }
}

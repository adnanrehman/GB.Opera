using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
 

namespace GB.Opera.CountryProfile
{
    public  interface ICountryProfileAppService : Volo.Abp.Application.Services.IApplicationService
    {
         Task<CountryProfileDto> GetCompanyProfile();
    }
}

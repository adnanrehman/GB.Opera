using System;
using System.Collections.Generic;
using System.Text;
using GB.Opera.Localization;
using Volo.Abp.Application.Services;

namespace GB.Opera;

/* Inherit your application services from this class.
 */
public abstract class OperaAppService : ApplicationService
{
    protected OperaAppService()
    {
        LocalizationResource = typeof(OperaResource);
    }
}

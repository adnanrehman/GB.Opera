using GB.Opera.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace GB.Opera.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class OperaController : AbpControllerBase
{
    protected OperaController()
    {
        LocalizationResource = typeof(OperaResource);
    }
}

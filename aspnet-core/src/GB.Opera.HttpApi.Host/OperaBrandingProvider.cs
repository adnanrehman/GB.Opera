using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace GB.Opera;

[Dependency(ReplaceServices = true)]
public class OperaBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Opera";
}

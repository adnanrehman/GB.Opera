using Volo.Abp.Modularity;

namespace GB.Opera;

[DependsOn(
    typeof(OperaApplicationModule),
    typeof(OperaDomainTestModule)
)]
public class OperaApplicationTestModule : AbpModule
{

}

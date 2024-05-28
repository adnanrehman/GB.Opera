using Volo.Abp.Modularity;

namespace GB.Opera;

[DependsOn(
    typeof(OperaDomainModule),
    typeof(OperaTestBaseModule)
)]
public class OperaDomainTestModule : AbpModule
{

}

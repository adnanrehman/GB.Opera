using GB.Opera.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace GB.Opera.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(OperaEntityFrameworkCoreModule),
    typeof(OperaApplicationContractsModule)
    )]
public class OperaDbMigratorModule : AbpModule
{
}

using Volo.Abp.Modularity;

namespace GB.Opera;

public abstract class OperaApplicationTestBase<TStartupModule> : OperaTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}

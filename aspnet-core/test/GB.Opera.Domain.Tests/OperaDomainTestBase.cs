using Volo.Abp.Modularity;

namespace GB.Opera;

/* Inherit from this class for your domain layer tests. */
public abstract class OperaDomainTestBase<TStartupModule> : OperaTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}

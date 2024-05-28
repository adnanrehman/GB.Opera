using Xunit;

namespace GB.Opera.EntityFrameworkCore;

[CollectionDefinition(OperaTestConsts.CollectionDefinitionName)]
public class OperaEntityFrameworkCoreCollection : ICollectionFixture<OperaEntityFrameworkCoreFixture>
{

}

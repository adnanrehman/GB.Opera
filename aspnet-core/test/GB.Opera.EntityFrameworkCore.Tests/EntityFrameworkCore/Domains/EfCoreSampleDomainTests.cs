using GB.Opera.Samples;
using Xunit;

namespace GB.Opera.EntityFrameworkCore.Domains;

[Collection(OperaTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<OperaEntityFrameworkCoreTestModule>
{

}

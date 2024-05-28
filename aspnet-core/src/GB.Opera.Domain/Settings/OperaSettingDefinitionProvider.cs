using Volo.Abp.Settings;

namespace GB.Opera.Settings;

public class OperaSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(OperaSettings.MySetting1));
    }
}

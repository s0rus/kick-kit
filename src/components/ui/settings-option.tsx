import { useState } from 'react';

import { SwitchProps } from '@radix-ui/react-switch';
import { KKSettingKey } from '../settings/settings-constants';
import { getSetting, setSetting } from '../settings/settings-manager';
import { Separator } from './separator';
import { Switch } from './switch';

interface SettingsOptionBase extends SwitchProps {
  title: string;
  subtitle: string;
  settingKey: KKSettingKey;
}

interface SettingsOptionProps extends SettingsOptionBase {
  subOption?: SettingsOptionBase;
  separator?: {
    top?: boolean;
    bottom?: boolean;
  };
}

const SettingsOption = ({ title, subtitle, settingKey, separator, subOption, ...rest }: SettingsOptionProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(getSetting(settingKey));

  const toggleOption = () => {
    setSetting(settingKey, !isEnabled);
    setIsEnabled(!isEnabled);
  };

  return (
    <>
      {separator?.top && <Separator />}
      <div className='px-4 py-2 translate-x-5'>
        <div className='flex flex-row justify-between items-center'>
          <div>
            <h4 className='font-bold'>{title}</h4>
            <p className='muted-paragraph text-xs'>{subtitle}</p>
          </div>
          <Switch checked={isEnabled} onClick={toggleOption} className='ml-4' {...rest} />
        </div>
      </div>
      {subOption && (
        <SettingsOption
          settingKey={subOption.settingKey}
          title={subOption.title}
          subtitle={subOption.subtitle}
          disabled={!isEnabled}
        />
      )}
      {separator?.bottom && <Separator />}
    </>
  );
};

export default SettingsOption;

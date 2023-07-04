import { Icon } from '@/components/ui/icon';
import { ReactNode } from 'react';
import ChatTab from './chat-tab';
import InformationTab from './information-tab';

export interface KKSettingTab {
  key: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
}

export const SETTINGS_TABS: KKSettingTab[] = [
  {
    key: 'chat-settings',
    title: 'Chat',
    icon: <Icon.messageSquare />,
    content: <ChatTab />,
  },
  {
    key: 'extension-information',
    title: 'Information',
    icon: <Icon.badgeInfo />,
    content: <InformationTab />,
  },
];

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Icon } from '../ui/icon';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SETTINGS_TABS } from './tabs/tab-constants';

const SettingsModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className='cursor-pointer'>
        <Icon.kickKit className='h-7 w-7 p-1' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Icon.kickKit />
          <DialogTitle className='pl-3'>KickKit settings</DialogTitle>
        </DialogHeader>
        <div className='h-full'>
          <Tabs defaultValue={SETTINGS_TABS[0].key} orientation='vertical' className='flex flex-row'>
            <div className='tab-list-container'>
              <TabsList className='flex flex-col'>
                {SETTINGS_TABS.map((tab) => (
                  <TabsTrigger key={`${tab.key}__trigger`} value={tab.key} className='flex w-full justify-start'>
                    {tab.icon && <div className='mr-4'>{tab.icon}</div>}
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollArea className='w-full'>
              {SETTINGS_TABS.map((tab) => (
                <TabsContent key={`${tab.key}__content`} value={tab.key}>
                  {tab.content}
                </TabsContent>
              ))}
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;

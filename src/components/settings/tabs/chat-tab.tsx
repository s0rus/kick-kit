import SettingsOption from '@/components/ui/settings-option';

const ChatTab = () => {
  return (
    <div>
      <SettingsOption
        settingKey='seekImages'
        title='Display images'
        subtitle='Display images directly in the chat from safe platforms (max. 5MB)'
        separator={{
          bottom: true,
        }}
        subOption={{
          settingKey: 'blurImages',
          title: 'Blur images',
          subtitle: 'Hover over image to reveal it (useful for streamers)',
        }}
      />
      <SettingsOption
        settingKey='seekVideos'
        title='Display streamable/youtube videos'
        subtitle='Display basic information about videos in the chat'
      />
    </div>
  );
};

export default ChatTab;

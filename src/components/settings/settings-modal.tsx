import * as Dialog from '@radix-ui/react-dialog';
import Logo from '../logo/logo';
import { useFeatureContext } from '../../context/FeaturesContext';
import SettingsButton from './SettingsButton';

const SettingsModal: React.FC = () => {
  const {
    streamerMode,
    changeStreamerMode,
    streamableMode,
    changeStreamableMode,
  } = useFeatureContext();

  return (
    <Dialog.Root>
      <Dialog.Trigger className='pt-1'>
        <Logo />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
        <Dialog.Content
          className='fixed top-0 left-0 right-0 bottom-0 flex flex-col data-[state=open]:opacity-0 items-center justify-center z-50'
          style={{ background: 'rgba(0, 0, 0, 0.85)', zIndex: '9999999' }}
        >
          <div
            style={{ background: '#0b0e0f' }}
            className=' rounded-lg p-6 w-3/4 flex flex-col'
          >
            <Dialog.Title className='text-green-500 text-2xl font-bold mb-4 flex  justify-start gap-2'>
              <Dialog.Close>
                <Logo />
              </Dialog.Close>
              KickKit Settings
            </Dialog.Title>

            <SettingsButton
              description={streamerMode ? 'Enabled' : 'Disabled'}
              text='Streamer Mode:'
              onClick={() => changeStreamerMode(!streamerMode)}
            />
            <SettingsButton
              description={streamableMode ? 'Enabled' : 'Disabled'}
              text='Show Streamable title instead of link:'
              onClick={() => changeStreamableMode(!streamableMode)}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SettingsModal;

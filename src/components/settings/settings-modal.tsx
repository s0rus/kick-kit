import * as Dialog from '@radix-ui/react-dialog';
import Logo from '../logo/logo';

const SettingsModal = () => (
  <Dialog.Root>
    <Dialog.Trigger>
      <Logo />
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title />
        <Dialog.Description />
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default SettingsModal;

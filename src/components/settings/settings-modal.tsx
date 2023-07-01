import Logo from '../logo/logo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const SettingsModal = () => (
  <Dialog>
    <DialogTrigger className='box-border'>
      <Logo className='h-7 w-7 p-1' />
    </DialogTrigger>
    <DialogContent className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]'>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <p>aha1</p>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <p>aha2</p>
        </div>
      </div>
      <DialogFooter>
        <p>aha3</p>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SettingsModal;

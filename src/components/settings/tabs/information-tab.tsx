import { buttonVariants } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { MANIFEST_INFO, REPO_LINK } from '../settings-constants';

const InformationTab = () => {
  return (
    <div className='flex flex-col items-center justify-center h-72'>
      <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
        {MANIFEST_INFO.appName} {MANIFEST_INFO.appVersion}
      </h3>
      <p className='muted-paragraph text-sm'>{MANIFEST_INFO.appDesc}</p>
      <Separator className='my-2' />
      <a
        href={REPO_LINK}
        target='_blank'
        className={buttonVariants({
          variant: 'ghost',
        })}
      >
        <Icon.gitHub />
      </a>
    </div>
  );
};

export default InformationTab;

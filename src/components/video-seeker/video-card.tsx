import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Icon } from '../ui/icon';
import { Skeleton } from '../ui/skeleton';
import { useVideo } from './use-video';
import { VideoInfo } from './video-url-parser';
import { getSetting } from '../settings/settings-manager';

interface VideoCardProps {
  videoInfo: NonNullable<VideoInfo>;
}

const VideoCard = ({ videoInfo }: VideoCardProps) => {
  const { data, error, isLoading } = useVideo(videoInfo);
  const shouldBeBlurred = getSetting('blurImages');

  if (error) {
    return <span className='underline'>{error.url}</span>;
  }

  return (
    <Card>
      <CardContent className='flex flex-row items-center'>
        <div className='aspect-video w-[80px] max-h-16 flex-shrink-0 mr-2 bg-black flex items-center justify-center relative'>
          {isLoading ? (
            <Skeleton className='card-image w-full h-full' />
          ) : data?.thumbnail_url ? (
            <>
              <img
                src={data?.thumbnail_url}
                style={{ filter: shouldBeBlurred ? 'blur(8px)' : 'blur(0px)' }}
                className='card-image'
              />
            </>
          ) : (
            <Icon.imageOff />
          )}
        </div>
        <div className='overflow-hidden max-w-[196px] flex-1 h-full'>
          {isLoading ? (
            <Skeleton className='w-full mb-1 rounded-lg' />
          ) : (
            <CardTitle className='text-sm max-h-full line-clamp-2 font-semibold'>
              {data?.title.length ? data?.title ?? 'Unknown' : 'Untitled'}
            </CardTitle>
          )}
          {isLoading ? (
            <Skeleton className='w-full rounded-lg' />
          ) : (
            <CardDescription>
              via{' '}
              {!data?.provider_name.length || !data?.provider_name
                ? 'Unknown provider'
                : data?.provider_name}
            </CardDescription>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

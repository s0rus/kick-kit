import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { useVideo } from './use-video';
import { CertainVideoInfo } from './video-url-parser';

interface VideoCardProps {
  videoInfo: CertainVideoInfo;
}

const VideoCard = ({ videoInfo }: VideoCardProps) => {
  const { data } = useVideo(videoInfo);

  return (
    <Card>
      <CardContent className='flex flex-row items-center'>
        <div className='aspect-video w-[80px] flex-shrink-0 mr-2'>
          <img src={data?.thumbnail_url} className='object-cover' />
        </div>
        <div className='overflow-hidden max-w-[196px]'>
          <CardTitle className='text-sm max-h-full line-clamp-2 font-semibold'>{data?.title}</CardTitle>
          <CardDescription>via {data?.provider_name}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;

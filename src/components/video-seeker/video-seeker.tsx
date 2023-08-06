import { injectReactElement } from '@/utils/injectReactElement';
import { scrollChatToBottom } from '../chat-watcher/chat-scroller';
import { getSetting } from '../settings/settings-manager';
import VideoCard from './video-card';
import { VideoInfo, extractVideoInfo } from './video-url-parser';

const injectVideoCard = async (anchorTag: HTMLAnchorElement, videoInfo: NonNullable<VideoInfo>) => {
  const anchorTagParent = anchorTag.parentElement;
  anchorTagParent?.childNodes[1].remove();

  const anchorAttributes = [...anchorTag.attributes].reduce((acc, { name, value }) => {
    const propName = name === 'class' ? 'className' : name;
    return { ...acc, [propName]: value };
  }, {});

  if (anchorTagParent) {
    injectReactElement({
      mode: 'insert',
      rootContainer: anchorTagParent,
      reactCompontent: (
        <a {...anchorAttributes} className='important-no-underline'>
          <VideoCard videoInfo={videoInfo} />
        </a>
      ),
    });

    await scrollChatToBottom({ bypassPause: false });
  }
};

export const seekAnchorToVideoCards = async (anchorTag: HTMLAnchorElement, potentialLinkUrl: string) => {
  if (!getSetting('seekVideos')) {
    return;
  }

  const videoInfo = extractVideoInfo(potentialLinkUrl);
  if (!videoInfo) {
    return;
  }

  await injectVideoCard(anchorTag, videoInfo);
};

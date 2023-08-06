import { appendChildAsync } from '@/utils/appendChildAsync';
import { KICKKIT_SEEKED_TOKEN } from '../chat-watcher/chat-constants';
import { scrollChatToBottom } from '../chat-watcher/chat-scroller';
import { getSetting } from '../settings/settings-manager';
import { KICKKIT_BLUR_OVERLAY_TOKEN, KICKKIT_IMAGE_CONTAINER_TOKEN } from './image-constants';
import { isValidImageUrl } from './image-url-parser';

interface AnchorToImageProps {
  anchorTag: HTMLAnchorElement;
  imageUrl: string;
  bypassPause?: boolean;
}

document.body.querySelectorAll(`.${KICKKIT_SEEKED_TOKEN}`).forEach((node) => {
  const anchorTag = node as HTMLAnchorElement;
  const potentialImageUrl = anchorTag.href;
  seekAnchorToImage({
    anchorTag,
    imageUrl: potentialImageUrl,
    bypassPause: true,
  });
});

const injectImage = async ({ anchorTag, imageUrl, bypassPause }: AnchorToImageProps) => {
  const shouldBeBlurred = getSetting('blurImages');

  anchorTag.classList.add(KICKKIT_SEEKED_TOKEN);
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = 'KickKit injected image';

  if (shouldBeBlurred) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add(KICKKIT_IMAGE_CONTAINER_TOKEN);
    anchorTag.appendChild(imageContainer);

    const blurredOverlay = document.createElement('div');
    blurredOverlay.classList.add(KICKKIT_BLUR_OVERLAY_TOKEN);

    imageContainer.appendChild(blurredOverlay);
    await appendChildAsync(imageContainer, imgElement);
  } else {
    await appendChildAsync(anchorTag, imgElement);
  }

  await scrollChatToBottom({ bypassPause });
};

export const seekAnchorToImage = async ({ anchorTag, imageUrl, bypassPause }: AnchorToImageProps) => {
  if (!isValidImageUrl(imageUrl)) {
    return;
  }
  anchorTag.textContent = '';
  await injectImage({
    anchorTag,
    imageUrl,
    bypassPause,
  });
};

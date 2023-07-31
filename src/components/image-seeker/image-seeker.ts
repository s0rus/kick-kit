import { KICKKIT_SEEKED_TOKEN } from '../chat-watcher/chat-constants';
import { getSetting } from '../settings/settings-manager';
import { KICKKIT_BLUR_OVERLAY_TOKEN, KICKKIT_IMAGE_CONTAINER_TOKEN } from './image-constants';
import { isValidImageUrl } from './image-url-parser';

const injectImage = (anchorTag: HTMLAnchorElement, imageUrl: string) => {
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
    imageContainer.appendChild(imgElement);
  } else {
    anchorTag.appendChild(imgElement);
  }
};

export const seekAnchorToImage = (anchorTag: HTMLAnchorElement, potentialImageUrl: string) => {
  if (!isValidImageUrl(potentialImageUrl)) {
    return;
  }
  anchorTag.textContent = '';
  injectImage(anchorTag, potentialImageUrl);
};

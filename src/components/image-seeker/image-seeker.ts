import { log } from '@/utils/logger';
import { getSetting } from '../settings/settings-manager';
import { CHAT_ENTRY_CLASS, KICKKIT_IMAGE_TOKEN } from './image-constants';
import { isValidImageUrl } from './image-url-parser';

log('Image seeker loaded!');

const injectImage = (node: Element, imageUrl: string) => {
  const shouldBeBlurred = getSetting('blurImages');

  node.classList.add(KICKKIT_IMAGE_TOKEN);
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = 'KickKit injected image';
  node.appendChild(imgElement);

  if (shouldBeBlurred) {
    /*
    ! IMPORTANT: Currently when image is blurred (especially if it's a video) the blur overflows 
    ! from the image container and causes weird glitches (in Chrome, idk about other browsers).
    ? TODO: Figure out how to handle the blur differently.
    */

    imgElement.classList.add('kickkit-blur');
  }
};

const getAnchorTags = (node: Element) => {
  const childElements = [...node.children];

  for (const childElement of childElements) {
    if (childElement.tagName.toLowerCase() === 'span') {
      const nestedSpan = childElement.querySelector('span');
      if (nestedSpan) {
        const anchorTag = nestedSpan.querySelector('a');
        if (anchorTag) {
          const potentialImageUrl = anchorTag.href;
          if (isValidImageUrl(potentialImageUrl)) {
            anchorTag.textContent = '';
            injectImage(anchorTag, potentialImageUrl);
          }
        }
      }
    }
  }
};

const searchForChatEntries = (node: Node) => {
  if (node instanceof Element && node.classList.contains(CHAT_ENTRY_CLASS)) {
    getAnchorTags(node.children[0]);
  }

  // ? TODO: Find out if there is a better way to look for the chat entry nodes
  // ? instead of using recursion.
  node.childNodes.forEach((childNode) => {
    searchForChatEntries(childNode);
  });
};

document.body.querySelectorAll(`.${KICKKIT_IMAGE_TOKEN}`).forEach((node) => {
  const potentialImageUrl = (node as HTMLAnchorElement).href;
  if (!isValidImageUrl(potentialImageUrl)) {
    return;
  }
  injectImage(node, potentialImageUrl);
});

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (const addedNode of mutation.addedNodes) {
        searchForChatEntries(addedNode);
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

export default {};

import { seekAnchorToImage } from '@/components/image-seeker/image-seeker';
import { seekAnchorToVideoCards } from '@/components/video-seeker/video-seeker';

import { waitForElement } from '@/utils/waitForElement';
import { CHAT_ENTRY_CLASS } from './chat-constants';

const parseAnchorTags = async (node: Element) => {
  const childElements = [...node.children];

  for (const childElement of childElements) {
    if (childElement.tagName.toLowerCase() === 'span') {
      const nestedSpan = childElement.querySelector('span');
      if (nestedSpan) {
        const anchorTag = nestedSpan.querySelector('a');
        if (anchorTag) {
          const anchorTagUrl = anchorTag.href;
          await seekAnchorToImage({
            anchorTag,
            imageUrl: anchorTagUrl,
            bypassPause: false,
          });
          await seekAnchorToVideoCards(anchorTag, anchorTagUrl);
        }
      }
    }
  }
};

const searchForChatEntries = (node: Node) => {
  if (node instanceof Element && node.classList.contains(CHAT_ENTRY_CLASS)) {
    parseAnchorTags(node.children[0]);
  }
  node.childNodes.forEach((childNode) => {
    searchForChatEntries(childNode);
  });
};

waitForElement<HTMLDivElement>({
  mode: 'id',
  name: 'chatroom',
}).then((chatroom) => {
  if (chatroom) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          for (const addedNode of mutation.addedNodes) {
            searchForChatEntries(addedNode);
          }

          // toggleTopGifters();
          // toggleEmoteHolder();
        }
      }
    });

    observer.observe(chatroom, { childList: true, subtree: true });
  }
});

export default {};

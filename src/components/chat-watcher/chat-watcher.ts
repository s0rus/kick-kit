import { toggleEmoteHolder, toggleTopGifters } from '@/components/element-hider/';
import { seekAnchorToImage } from '@/components/image-seeker/image-seeker';
import { seekAnchorToVideoCards } from '@/components/video-seeker/video-seeker';
import { CHAT_ENTRY_CLASS } from './chat-constants';

const parseAnchorTags = (node: Element) => {
  const childElements = [...node.children];

  for (const childElement of childElements) {
    if (childElement.tagName.toLowerCase() === 'span') {
      const nestedSpan = childElement.querySelector('span');
      if (nestedSpan) {
        const anchorTag = nestedSpan.querySelector('a');
        if (anchorTag) {
          const anchorTagUrl = anchorTag.href;
          seekAnchorToImage(anchorTag, anchorTagUrl);
          seekAnchorToVideoCards(anchorTag, anchorTagUrl);
        }
      }
    }
  }
};

const searchForChatEntries = (node: Node) => {
  if (node instanceof Element && node.classList.contains(CHAT_ENTRY_CLASS)) {
    parseAnchorTags(node.children[0]);
  }

  // ? TODO: Find out if there is a better way to look for the chat entry nodes
  // ? instead of using recursion.
  node.childNodes.forEach((childNode) => {
    searchForChatEntries(childNode);
  });
};

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (const addedNode of mutation.addedNodes) {
        searchForChatEntries(addedNode);
      }

      toggleTopGifters();
      toggleEmoteHolder();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

export default {};

import { log } from '../utils/logger';
import { isValidImageUrl } from './image-url-parser';
log('Image seeker loaded!');

const KICKKIT_IMAGE_TOKEN = 'kickkit-image' as const;
const CHAT_ENTRY_CLASS = 'chat-entry' as const;
const injectImage = (node: Element, imageUrl: string) => {
  node.classList.add(KICKKIT_IMAGE_TOKEN);
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = 'KickKit injected image';

  const imgStyles: Partial<CSSStyleDeclaration> = {
    transition: '0.3s all ease-in-out',
    borderRadius: '8px',
    border: '1px solid #18181b;',
  };

  Object.assign(imgElement.style, imgStyles);

  const bodyElement = document.querySelector('body') as Element;
  const updateImageBlur = () => {
    if (
      bodyElement instanceof HTMLElement &&
      bodyElement.getAttribute('streamermode') === 'on'
    ) {
      imgElement.style.filter = 'blur(8px)';
    } else {
      imgElement.style.filter = 'blur(0)';
    }
  };

  const observer = new MutationObserver(updateImageBlur);
  observer.observe(bodyElement, { attributes: true });

  updateImageBlur();

  // Dodaj obsługę zdarzeń dla efektu hover
  imgElement.addEventListener('mouseenter', () => {
    imgElement.style.filter = 'blur(0px)'; // Odbluruj obraz po najechaniu myszą
  });

  imgElement.addEventListener('mouseleave', () => {
    updateImageBlur(); // Przywróć efekt rozmycia po opuszczeniu myszą
  });

  node.appendChild(imgElement);
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
          if (!isValidImageUrl(potentialImageUrl)) {
            return;
          }
          anchorTag.textContent = '';
          injectImage(anchorTag, potentialImageUrl);
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

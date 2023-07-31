import { getElement } from '@/utils/getElement';
import { CHATROOM_TOP_ID } from '../chat-watcher/chat-constants';
import { getSetting } from '../settings/settings-manager';

export const toggleTopGifters = () => {
  const shouldBeHidden = getSetting('hideTopGifters');
  getElement(document.body, `#${CHATROOM_TOP_ID}`).then((container) => {
    if (container) {
      getElement(container, '.z-20').then((element) => {
        if (element) {
          shouldBeHidden ? element.classList.remove('lg:block') : element.classList.add('lg:block');
        }
      });
    }
  });
};

toggleTopGifters();

export default {};

import { getElement } from '@/utils/getElement';
import { EMOTE_HOLDER_CLASS } from '../chat-watcher/chat-constants';
import { getSetting } from '../settings/settings-manager';
import { KICKKIT_HIDDEN_CLASS } from './element-hider-constants';

export const toggleEmoteHolder = () => {
  const shouldBeHidden = getSetting('hideEmoteHolder');
  getElement(document.body, `.${EMOTE_HOLDER_CLASS}`).then((container) => {
    if (container) {
      shouldBeHidden ? container.classList.add(KICKKIT_HIDDEN_CLASS) : container.classList.remove(KICKKIT_HIDDEN_CLASS);
    }
  });
};

toggleEmoteHolder();

export default {};

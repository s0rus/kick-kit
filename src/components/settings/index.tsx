import { injectReactElement } from '@/utils/injectReactElement';
import { MAIN_NAVBAR_TOKEN, SETTINGS_MODAL_ID } from './settings-constants';
import SettingsModal from './settings-modal';

const settingsModalElement = document.createElement('div');
settingsModalElement.id = SETTINGS_MODAL_ID;
settingsModalElement.classList.add('h-7');

injectReactElement({
  rootContainer: settingsModalElement,
  reactCompontent: <SettingsModal />,
  mode: 'watch',
  watchSettings: {
    getContainer: () => document.querySelector(`.${MAIN_NAVBAR_TOKEN}`),
    getWatchedElement: () => document.getElementById(SETTINGS_MODAL_ID),
    elementInsertFunction: (container) => {
      container.insertBefore(settingsModalElement, container.children[container.childElementCount - 1]);
    },
  },
});

export default {};

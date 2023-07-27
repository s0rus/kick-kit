import React from 'react';
import { createRoot } from 'react-dom/client';
import { MAIN_NAVBAR_TOKEN, SETTINGS_MODAL_ID } from './settings-constants';
import SettingsModal from './settings-modal';

const settingsModalElement = document.createElement('div');
settingsModalElement.id = SETTINGS_MODAL_ID;
settingsModalElement.classList.add('h-7');

const renderSettingsModal = () => {
  createRoot(settingsModalElement).render(
    <React.StrictMode>
      <SettingsModal />
    </React.StrictMode>
  );
};

const waitForContainer = () => {
  return new Promise((resolve) => {
    const container = document.body.querySelector(`.${MAIN_NAVBAR_TOKEN}`);
    if (container) {
      resolve(container);
    } else {
      const observer = new MutationObserver(() => {
        const observerContainer = document.body.querySelector(`.${MAIN_NAVBAR_TOKEN}`);
        if (observerContainer) {
          observer.disconnect();
          resolve(observerContainer);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
};

waitForContainer().then((container) => {
  const c = container as Element;
  c.insertBefore(settingsModalElement, c.children[c.childElementCount - 1]);
  renderSettingsModal();
});

export default {};

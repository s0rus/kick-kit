import React from 'react';
import ReactDOM from 'react-dom/client';
import { MAIN_NAVBAR_TOKEN, SETTINGS_MODAL_ID } from './settings-constants';
import SettingsModal from './settings-modal';

const settingsModalElement = document.createElement('div');
settingsModalElement.id = SETTINGS_MODAL_ID;

const renderSettingsModal = () => {
  ReactDOM.createRoot(settingsModalElement).render(
    <React.StrictMode>
      <SettingsModal />
    </React.StrictMode>
  );
};

const observeContainer = () => {
  const container = document.body.querySelector(`.${MAIN_NAVBAR_TOKEN}`);
  if (container) {
    container.insertBefore(settingsModalElement, container.children[container.childElementCount - 1]);
    renderSettingsModal();
  } else {
    const observer = new MutationObserver(observeContainer);
    observer.observe(document.body, { childList: true, subtree: true });
  }
};

observeContainer();

export default {};

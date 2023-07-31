import { getElement } from '@/utils/getElement';
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

getElement(document.body, `.${MAIN_NAVBAR_TOKEN}`).then((container) => {
  container.insertBefore(settingsModalElement, container.children[container.childElementCount - 1]);
  renderSettingsModal();
});

export default {};

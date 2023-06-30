import React from 'react';
import ReactDOM from 'react-dom/client';
import { SETTINGS_MODAL_ID } from './settings-constants';
import SettingsModal from './settings-modal';

const settingsModalElement = document.createElement('div');
settingsModalElement.id = SETTINGS_MODAL_ID;
document.body.appendChild(settingsModalElement);

ReactDOM.createRoot(document.getElementById(SETTINGS_MODAL_ID) as HTMLElement).render(
  <React.StrictMode>
    <SettingsModal />
  </React.StrictMode>
);

export default {};

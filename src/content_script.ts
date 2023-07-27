import './components';
import { initializeSettings } from './components/settings/settings-manager';
import './styles/globals.css';
import { log } from './utils/logger';

log('Content script loaded!');

initializeSettings();

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('kk_styles.css');
link.id = 'kickkit-styles';
document.head.appendChild(link);

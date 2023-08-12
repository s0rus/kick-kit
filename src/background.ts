import type { EventKey } from './components/events/event-constants.ts';

chrome.scripting.registerContentScripts([
  {
    id: 'kickkit',
    js: ['content_script.js'],
    matches: ['*://*.kick.com/*'],
    runAt: 'document_end',
  },
]);

chrome.runtime.onMessage.addListener((eventKey: EventKey) => {
  if (eventKey) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.id) {
        chrome.tabs.sendMessage(tab.id, eventKey);
      }
    });
  }
});

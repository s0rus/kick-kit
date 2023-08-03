chrome.scripting.registerContentScripts([
  {
    id: 'kickkit',
    js: ['content_script.js'],
    matches: ['*://*.kick.com/*'],
    runAt: 'document_end',
  },
]);

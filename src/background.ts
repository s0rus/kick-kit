chrome.scripting.registerContentScripts([
  {
    id: 'kickkit',
    js: ['content_script.js'],
    matches: ['*://*.kick.com/*'],
    runAt: 'document_end',
  },
]);

const getTabId = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs[0].id;
};

chrome.runtime.onMessage.addListener(async (message) => {
  if (message === 'initToggleTopGifters') {
    chrome.tabs.sendMessage((await getTabId()) || 0, 'toggleTopGifters');
  }
  if (message === 'initToggleEmoteHolder') {
    chrome.tabs.sendMessage((await getTabId()) || 0, 'toggleEmoteHolder');
  }
});

export default {};

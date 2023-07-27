chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^https?:\/\/(www\.)?kick\.com(\/|$)/.test(tab?.url ?? '')) {
    chrome.tabs.get(tabId, (existingTab) => {
      if (chrome.runtime.lastError || !existingTab) {
        return;
      }

      chrome.scripting
        .executeScript({
          target: { tabId: tabId },
          files: ['content_script.js'],
        })
        .then((results) => {
          console.log(results);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
});

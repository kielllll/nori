/// <reference lib="webworker" />

chrome.scripting.getRegisteredContentScripts().then(async (scripts) => {
  if (scripts.length > 0) {
    await chrome.scripting.unregisterContentScripts({
      ids: scripts.map((s) => s.id),
    });
  }
});

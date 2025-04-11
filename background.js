chrome.runtime.onMessage.addListener((message, sender) => {
  if (sender.tab && typeof message.mute === 'boolean') {
    chrome.tabs.update(sender.tab.id, { muted: message.mute });
    console.log(`📣 탭 ${message.mute ? '음소거' : '음소거 해제'}됨 (tabId: ${sender.tab.id})`);
  }
});

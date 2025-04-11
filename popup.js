const toggle = document.getElementById('toggleMute');

chrome.storage.sync.get(['muteEnabled'], (res) => {
  toggle.checked = res.muteEnabled ?? true;
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ muteEnabled: toggle.checked });
});

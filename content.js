let isMuted = false;

function isAdVisible() {
  const el = [...document.querySelectorAll('span')]
    .find(el => el.textContent.trim() === '광고 정보 더보기');
  if (!el) return false;

  const style = window.getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
}

function handleAdCheck() {
  chrome.storage.sync.get(['muteEnabled'], (res) => {
    if (!res.muteEnabled) return;

    const adDetected = isAdVisible();
    if (adDetected && !isMuted) {
      chrome.runtime.sendMessage({ mute: true });
      isMuted = true;
      console.log('📢 광고 감지 - 탭 음소거 요청');
    } else if (!adDetected && isMuted) {
      chrome.runtime.sendMessage({ mute: false });
      isMuted = false;
      console.log('🎵 광고 종료 - 탭 음소거 해제 요청');
    }
  });
}

setInterval(handleAdCheck, 1000);

let isMuted = false;
let muteInterval = null;

function isAdVisible() {
  const el = [...document.querySelectorAll('span')]
    .find(el => el.textContent.trim() === '광고 정보 더보기');
  if (!el) return false;

  const style = window.getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
}

function muteAllVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (!video.muted || video.volume > 0) {
      video.muted = true;
      video.volume = 0;
      console.log('🔇 비디오 강제 음소거', video);
    }
  });
}

function unmuteAllVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = false;
    video.volume = 1;
    console.log('🔊 비디오 음소거 해제', video);
  });
}

function startForceMute() {
  if (muteInterval) return;

  muteInterval = setInterval(() => {
    muteAllVideos(); // 반복적으로 mute 강제 적용
  }, 500);
}

function stopForceMute() {
  if (muteInterval) {
    clearInterval(muteInterval);
    muteInterval = null;
  }
}

function handleAdMute() {
  chrome.storage.sync.get(['muteEnabled'], (res) => {
    if (!res.muteEnabled) return;

    const adDetected = isAdVisible();

    if (adDetected && !isMuted) {
      muteAllVideos();
      startForceMute();
      isMuted = true;
      console.log('✅ 광고 감지 - 음소거 시작');
    } else if (!adDetected && isMuted) {
      unmuteAllVideos();
      stopForceMute();
      isMuted = false;
      console.log('✅ 광고 종료 - 음소거 해제');
    }
  });
}

setInterval(handleAdMute, 1000);

// video 동적 추가될 때 mute 적용
const observer = new MutationObserver(() => {
  if (isMuted) muteAllVideos();
});
observer.observe(document.body, { childList: true, subtree: true });

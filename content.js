let isMuted = false;

function isAdButtonVisible() {
  const btn = Array.from(document.querySelectorAll('button, div, span')).find(el =>
    el.textContent?.includes('광고정보더보기')
  );
  return !!(btn && btn.offsetParent !== null); // 보이는 상태일 때만 true
}

function toggleMute() {
  const video = document.querySelector('video');
  if (!video) return;

  const isAd = isAdButtonVisible();

  if (isAd && !isMuted) {
    video.muted = true;
    isMuted = true;
    console.log('🔇 광고 감지 - 음소거');
  } else if (!isAd && isMuted) {
    video.muted = false;
    isMuted = false;
    console.log('🔊 광고 종료 - 소리 복원');
  }
}

setInterval(toggleMute, 1000);

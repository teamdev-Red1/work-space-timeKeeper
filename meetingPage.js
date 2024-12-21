//ダウンカウンターの実装
let countdownTime = 10 * 60;  //例として10分

const countdownElement = document.getElementById('countdown')

//時間は二桁表示    ex)5分："05"
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainSeconds.toString().padStart(2, '0')}`;
}

function updateCountdown(){
  if (countdownTime > 0) {
    countdownTime--;
    countdownElement.textContent = formatTime(countdownTime);
  }
  else {
    clearInterval(countdownInterval);
    countdownElement.textContent = "00:00";
  }
}


// 1秒ごとにカウントダウンを更新
const countdownInterval = setInterval(updateCountdown, 1000);

// 初期値を表示
countdownElement.textContent = formatTime(countdownTime);

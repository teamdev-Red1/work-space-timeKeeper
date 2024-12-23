document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'index.html') {
    //index.htmlでの処理
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function () {
      const agenda = document.getElementById('agenda-container').value;
      const minutes = document.getElementById('timer-input').value;

      //localStorageにデータを保存
      localStorage.setItem('agenda', agenda);
      localStorage.setItem('minutes', minutes);

      //meetingPage.htmlに移動
      window.location.href = "meetingPage.html";
    });
  }
  else if (currentPage === 'meetingPage.html') {
    //meetingPage.htmlの処理
    const agendaDisplay = document.getElementById('agendaDisplay');
    const timerDisplay = document.getElementById('timer');

    //localStorageからデータ取得
    const agenda = localStorage.getItem('agenda');
    const minutes = localStorage.getItem('minutes');

    //アジェンダの表示
    agendaDisplay.textContent = agenda;

    //ダウンカウンターの実装
    let remainTime = parseInt(minutes, 10)* 60;

    const updateTimer = () => {
      const mins = Math.floor(remainTime / 60);
      const secs = remainTime % 60;
      timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      //ここに残り時間ごとのメッセージをつけ足していく
      if (remainTime > 0) {
        remainTime -= 1;
        setTimeout(updateTimer, 1000);
      } else {
        alert('終了しました!!');
      }
    };
    updateTimer();

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function () {
      //meetingPage.htmlに移動
      window.location.href = "index.html";
    });
  }
});

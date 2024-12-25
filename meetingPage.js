document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'index.html') {
    //index.htmlでの処理
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function () {
      const agenda = document.getElementById('agenda-text').value;
      const minutes = document.getElementById('minutes-input').value;
      const seconds = document.getElementById('seconds-input').value;

      //localStorageにデータを保存
      localStorage.setItem('agenda', agenda);
      localStorage.setItem('minutes', minutes);
      localStorage.setItem('seconds', seconds);

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
    const seconds = localStorage.getItem('seconds');

    //アジェンダの表示
    agendaDisplay.textContent = agenda;

    //ダウンカウンターの実装
    //parseInt:文字列の数値への変換(10進数を指定)
    remainTime = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

    const updateTimer = () => {
      const mins = Math.floor(remainTime / 60); //タイマーの分数
      const secs = remainTime % 60; //タイマーの秒数
      timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      //ここに残り時間ごとのメッセージをつけ足していく
      if (remainTime > 0) {
        remainTime -= 1;
        setTimeout(updateTimer, 1000);
      } else {
        alert('終了しました!!');
      }
    };
    updateTimer(); //タイマーの更新(1秒減らす)

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function () {
      //index.htmlに移動
      window.location.href = "index.html";
    });
  }
});

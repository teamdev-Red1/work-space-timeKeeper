document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'index.html') {
    //index.htmlでの処理
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function () {
      const agenda = document.getElementById('agenda-container').value;
      const minutes = document.getElementById('minutes-input').value;
      const seconds = document.getElementById('seconds-input').value;

      //アジェンダが空∨スペースのみ場合
      if (!agenda || !/\S/.test(agenda)) {
        alert('アジェンダを入力してください！スペースだけも無効です'); // アラートを表示
        return; // 処理を中断
      }

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
    const agendaDisplay = document.getElementById('agenda');
    const timerDisplay = document.getElementById('timer');
    const comment = document.getElementById('comment')

    //localStorageからデータ取得
    const agenda = localStorage.getItem('agenda');
    const minutes = localStorage.getItem('minutes');
    const seconds = localStorage.getItem('seconds');

    //アジェンダの表示
    agendaDisplay.textContent = 'アジェンダは「' + agenda + '」です。';

    //ダウンカウンターの実装
    //parseInt:文字列の数値への変換(10進数を指定)
    counterTime = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    remainTime = counterTime;
    const updateTimer = () => {
      const mins = Math.floor(remainTime / 60); //タイマーの分数
      const secs = remainTime % 60; //タイマーの秒数
      timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      //ここに残り時間ごとのメッセージをつけ足していく
      if (remainTime > 0) {
        if (remainTime > 0.9 * counterTime) {
          comment.textContent = "議題を共有しましょう"
        }
        else if (remainTime > 0.8 * counterTime) {
          comment.textContent = "ゴールを共有しましょう"
        }
        else if (remainTime > 0.2 * counterTime) {
          comment.textContent = "議論する時間です"
        }
        else if (remainTime > 0.1 * counterTime) {
          comment.textContent = "⚠️議論をまとめてください⚠️"
        }
        else{
          comment.textContent = "次回までのto doを共有してください"
        }
        remainTime -= 1;
        setTimeout(updateTimer, 1000);
      } else {
        comment.textContent = "お疲れさまでした!"
      }
    };
    updateTimer(); //タイマーの更新

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function () {
      //index.htmlに移動
      window.location.href = "index.html";
    });
  }
});

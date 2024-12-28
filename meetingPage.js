document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'index.html') {
    //index.htmlでの処理
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function () {
      const agendas = []; //リストで複数のagendaを格納
      const inputs = document.querySelectorAll(".agenda-input");
      inputs.forEach(input => {
        const value = input.value;
        if (value || /\S/.test(value)) {  //空またはスペースのみの物は除外
          agendas.push(value)
        }
      });

      if (agendas.length === 0) { //アジェンダが入力されてない場合
        alert("少なくとも一つのアジェンダを指定してください");
        return;
      }

      //分数の取得
      const minutes = document.getElementById('minutes-data').value;

      //localStorageにデータを保存
      localStorage.setItem('agendas', JSON.stringify(agendas));
      localStorage.setItem('minutes', minutes);

      //meetingPage.htmlに移動
      window.location.href = "meetingPage.html";
    });
  }
  else if (currentPage === 'meetingPage.html') {
    //meetingPage.htmlの処理
    const agendaDisplay = document.getElementById('agenda-list');
    const timerDisplay = document.getElementById('timer');
    const comment = document.getElementById('comment')

    //localStorageからデータ取得
    const agendas = JSON.parse(localStorage.getItem('agendas') || '[]');
    const minutes = localStorage.getItem('minutes');

    //アジェンダの表示
    agendas.forEach((agenda, index) => {
    const div = document.createElement('div');
    div.className = 'agenda-box';
    div.textContent = `${index + 1}. ${agenda}`; //agendaの表示形式

    // 議論済みのアジェンダに線を引く
    div.addEventListener('click', function () {
      div.classList.toggle('completed'); // CSSクラスを切り替える
    });

    agendaDisplay.appendChild(div);
    });

    //ダウンカウンターの実装
    //parseInt:文字列の数値への変換(10進数を指定)
    counterTime = parseInt(minutes, 10) * 60;
    remainTime = counterTime;
    const updateTimer = () => {
      const mins = Math.floor(remainTime / 60); //タイマーの分数
      const secs = remainTime % 60; //タイマーの秒数
      timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`; //タイマー表示
      //残り時間ごとのメッセージ
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

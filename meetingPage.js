document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage === 'index.html') {
    //index.htmlでの処理
    const startButton = document.getElementById('start-btn');
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

      const goals = [];
      const goalInputs = document.querySelectorAll('.goal-input');
      goalInputs.forEach(input => {
        const value = input.value;
        if (value || /\S/.test(value)) {  //空またはスペースのみの物は除外
          goals.push(value)
        }
      })

      if (agendas.length === 0) {
        alert("少なくとも一つのゴールを指定してください");
        return;
      }

      if (agendas.length !== goals.length) {
        alert("アジェンダとゴールの数が一致していません。入力内容を確認してください。");
        return;
      }


      //分数の取得
      const minutes = document.getElementById('minutes-data').value;

      //localStorageにデータを保存
      const agendasWithGoals = agendas.map((agenda, index) => ({
        agenda: agenda,
        goal: goals[index]
      }));
      localStorage.setItem('agendasWithGoals', JSON.stringify(agendasWithGoals));
      localStorage.setItem('minutes', minutes);

      //meetingPage.htmlに移動
      window.location.href = "meetingPage.html";
    });
  }
  else if (currentPage === 'meetingPage.html') {
    //meetingPage.htmlの処理
    const agendaList = document.getElementById('agenda-list');
    const goalList = document.getElementById('goal-list');
    const timerDisplay = document.getElementById('timer');
    const comment = document.getElementById('comment')

    //localStorageからデータ取得
    const agendasWithGoals = JSON.parse(localStorage.getItem('agendasWithGoals'));
    const minutes = localStorage.getItem('minutes');

    // アジェンダを表示
    agendasWithGoals.forEach((item, index) => {
      // アジェンダ
      const agendaDiv = document.createElement('div');
      agendaDiv.className = 'agenda-box d-flex align-items-center';

      const agendaCheckbox = document.createElement('input');
      agendaCheckbox.type = 'checkbox';
      agendaCheckbox.style.marginRight = '10px';

      const agendaLabel = document.createElement('span');
      agendaLabel.textContent = `${index + 1}. アジェンダ: ${item.agenda}`;

      agendaCheckbox.addEventListener('change', function () {
        if (agendaCheckbox.checked) {
          agendaLabel.style.textDecoration = 'line-through';
          agendaLabel.style.color = 'gray';
        } else {
          agendaLabel.style.textDecoration = 'none';
          agendaLabel.style.color = 'black';
        }
      });

      agendaDiv.appendChild(agendaCheckbox);
      agendaDiv.appendChild(agendaLabel);
      agendaList.appendChild(agendaDiv);

      // ゴール
      const goalDiv = document.createElement('div');
      goalDiv.className = 'goal-box d-flex align-items-center';

      const goalCheckbox = document.createElement('input');
      goalCheckbox.type = 'checkbox';
      goalCheckbox.style.marginRight = '10px';

      const goalLabel = document.createElement('span');
      goalLabel.textContent = `${index + 1}. ゴール: ${item.goal}`;

      goalCheckbox.addEventListener('change', function () {
        if (goalCheckbox.checked) {
          goalLabel.style.textDecoration = 'line-through';
          goalLabel.style.color = 'gray';
        } else {
          goalLabel.style.textDecoration = 'none';
          goalLabel.style.color = 'black';
        }
      });

      goalDiv.appendChild(goalCheckbox);
      goalDiv.appendChild(goalLabel);
      agendaList.appendChild(goalDiv);
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

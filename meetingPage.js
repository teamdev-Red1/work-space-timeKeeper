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
        if (value && /\S/.test(value)) {  //空またはスペースのみの物は除外
          agendas.push(value)
        }
      });

      if (agendas.length === 0) { //アジェンダが入力されてない場合
        alert("少なくとも一つのアジェンダを指定してください(スぺースのみは無効です)");
        return;
      }

      const goals = [];
      const goalInputs = document.querySelectorAll('.goal-input');
      goalInputs.forEach(input => {
        const value = input.value;
        if (value && /\S/.test(value)) {  //空またはスペースのみの物は除外
          goals.push(value)
        }
      })

      if (agendas.length === 0) {
        alert("少なくとも一つのゴールを指定してください(スペースのみは無効です)");
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
    const timerDisplay = document.getElementById('timer');
    const comment = document.getElementById('comment');

    // localStorageからデータ取得
    const agendasWithGoals = JSON.parse(localStorage.getItem('agendasWithGoals') || '[]');
    const minutes = localStorage.getItem('minutes');

    if (agendasWithGoals.length === 0) {
      alert("アジェンダとゴールがありません。トップページに戻ります。");
      window.location.href = "index.html";
      return;
    }

    // チェック状態の復元（オプション）
    const completedStates = JSON.parse(localStorage.getItem('completedStates') || '[]');

    // アジェンダとゴールを2行で表示し、チェックボックスで横線を引く
    // アジェンダとゴールを表示
    agendasWithGoals.forEach((item, index) => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'row-item d-flex flex-column align-item-center';

      // チェックボックスを作成
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'row-checkbox mb-2';

      const agendWithCheck = document.createElement('div');
      agendWithCheck.className = 'd-flex agenda-check';

      // アジェンダ行
      const agendaDiv = document.createElement('div');
      agendaDiv.className = 'agenda-box d-flex align-items-center';
      agendaDiv.textContent = `${index + 1}. アジェンダ: ${item.agenda}`;

      // ゴール行
      const goalDiv = document.createElement('div');
      goalDiv.className = 'goal-box';
      goalDiv.textContent = `${index + 1}. ゴール: ${item.goal}`;

      // チェック時・解除時のスタイル変更
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          agendaDiv.style.textDecoration = 'line-through';
          agendaDiv.style.color = 'gray';
          goalDiv.style.textDecoration = 'line-through';
          goalDiv.style.color = 'gray';
        } else {
          agendaDiv.style.textDecoration = 'none';
          agendaDiv.style.color = 'black';
          goalDiv.style.textDecoration = 'none';
          goalDiv.style.color = 'black';
        }

        // チェック状態を保存
        const updatedCompletedStates = agendasWithGoals.map((item, idx) => {
        const row = document.querySelectorAll('.row-item')[idx];
        const rowCheckbox = row.querySelector('.row-checkbox');
        return rowCheckbox.checked;
      });
      localStorage.setItem('completedStates', JSON.stringify(updatedCompletedStates));
    });

    // 初期状態の復元
    if (completedStates[index]) {
      checkbox.checked = true;
      agendaDiv.style.textDecoration = 'line-through';
      agendaDiv.style.color = 'gray';
      goalDiv.style.textDecoration = 'line-through';
      goalDiv.style.color = 'gray';
    }

      agendWithCheck.appendChild(checkbox);
      agendWithCheck.appendChild(agendaDiv);

      rowDiv.appendChild(agendWithCheck);
    rowDiv.appendChild(goalDiv);
    agendaList.appendChild(rowDiv);
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

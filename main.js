const  CONFIG = {
    minutesInput:document.getElementById("minutes-input"),
    minutesData:document.getElementById("minutes-data"),

}

class View{
    //スライダーとタイマーの連動
    static slider(time,input){
        input.addEventListener("input",function(){
            time.value = input.value;
        })
    }
    //アジェンダを追加する
    static createAgenda(n){
        //n個までアジェンダが作れる
        if(!Controller.isMaxOrLessAgenda(n)){
            alert(`アジェンダの最大は${n}個までです`);
        }else{
        const inputDiv = document.createElement("div");
        inputDiv.classList.add("d-flex","flex-column","col-12","input-group");
        const target = document.getElementById("agenda-container");

        const agendaDiv = document.createElement("div");
        agendaDiv.classList.add("d-flex","col-12","align-items-center","justify-content-end");

        const agendaDiv = document.createElement("div");
        agendaDiv.classList.add("d-flex","col-12","align-items-center","justify-content-end");

        agendaDiv.innerHTML =`
                    <label class="p-2"><h3>アジェンダ：</h3></label>
                    <input type="text" class="mb-3 agenda-input" maxlength="30" placeholder="アジェンダを入力してください(最大30文字)">
        `;
        const goalDiv = document.createElement("div");
        goalDiv.classList.add("d-flex","col-12","align-items-center","justify-content-end");

        goalDiv.innerHTML =`
                    <label class="p-2"><h3>ゴール：</h3></label>
                    <input type="text" class="mb-3 goal-input" maxlength="30" placeholder="ゴールを入力してください(最大30文字)">
        `;
        inputDiv.append(agendaDiv);
        inputDiv.append(goalDiv);

        target.append(inputDiv);
        }
    }
    //アジェンダを削除するメソッド
    static removeAgenda(){
        const inputGroup = document.querySelectorAll(".input-group");
        const target = inputGroup.item(inputGroup.length - 1);
        if(inputGroup.length > 1){
            target.remove();
        }

    }
}
class Controller{
    //add btn event
    static addBtn(){
       const btn = document.getElementById("add-btn");

        btn.addEventListener("click",function(){
            View.createAgenda(3);
        })
    }
    static removeBtn(){
        //remove btn event
        const btn = document.getElementById("remove-btn");

        btn.addEventListener("click",function(){
            View.removeAgenda();
        })
    }
    //最大値nよりアジェンダの数が少ないか
    static isMaxOrLessAgenda(n){
        const numberOfAgenda = document.querySelectorAll(".agenda-input").length;
        console.log(numberOfAgenda);
        return numberOfAgenda < n;
    }
}
View.slider(CONFIG.minutesData,CONFIG.minutesInput);
Controller.addBtn();
Controller.removeBtn();

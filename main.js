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
        const input = document.createElement("input");
        const target = document.getElementById("agenda-container");

        input.classList.add("agenda-input","mb-3");
        input.placeholder = "アジェンダを入力してください";
        target.append(input);
        }
    }
    //アジェンダを削除するメソッド
    static removeAgenda(){
        const agenda = document.querySelectorAll(".agenda-input");
        const target = agenda.item(agenda.length - 1);
        if(agenda.length > 1){
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

const  CONFIG = {
    minutesInput:document.getElementById("minutes-input"),
    secondsInput:document.getElementById("seconds-input"),
    minutesData:document.getElementById("minutes-data"),
    secondsData:document.getElementById("seconds-data")
}

class View{
    static slider(time, input) {
        time.textContent = input.value;
        input.addEventListener("input",function(){
            time.textContent = input.value;
        })
    }
}
View.slider(CONFIG.minutesData,CONFIG.minutesInput);
View.slider(CONFIG.secondsData,CONFIG.secondsInput);

const  CONFIG = {
    minutesInput:document.getElementById("minutes-input"),
    secondsInput:document.getElementById("seconds-input"),
    minutesData:document.getElementById("minutes-data"),
    secondsData:document.getElementById("seconds-data"),
    sliderMarker:document.getElementById("markers")
}

class View{
    //スライダーとタイマーの連動
    static slider(time,input){
        input.addEventListener("input",function(){
            time.value = input.value;
        })
    }
    //スライダーの目盛りを作る
    static createMarkers(maxValue){
        const ele = CONFIG.sliderMarker;
        
        
        for(let i = 5;i < maxValue; i += 5){
            const marker = document.createElement("option");
            marker.value = i;

            ele.appendChild(marker);
        }
    }
}
View.slider(CONFIG.minutesData,CONFIG.minutesInput);
View.createMarkers(120);
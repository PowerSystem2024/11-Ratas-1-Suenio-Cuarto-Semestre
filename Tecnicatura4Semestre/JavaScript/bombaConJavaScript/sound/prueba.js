var theCount;
var alarm = document.getElementById("alarm");
var alarm2 = document.getElementById("alarm2");
var panel = document.getElementById("panel");
var turnoff = document.getElementById("turn-off");
var turnoffHor = document.getElementById("closing");
var detonate = document.getElementById("detonate");
alarm.volume = 0.50;

var time = document.getElementById("time");
function showCountDown(){
    time.innerText = time.innerText - 1;
    if (time.innerText == 0) {
        clearInterval(theCount);
        time.classList.add("crono");
        abort.classList.add("hide");
        detonate.classList.add("show");
        setTimeout(function (){
            turnOff.classList.add("close");
            turnOffHor.classList.add("close");
            reload.classList.add("show");
            alarm.pause();
            alarm2.play();
        }, 1500);
    }
}

var cover = document.getElementById("cover");
cover.addEventListener("click", function(){
    if (this.className == "box") { this.classList.add("opened")} //If (this.className == "box") this.classList.add("opened") esto tenia el profesro pero daba error por no tener las {}
    else {this.classList.remove("opened");                       //else this.classList.remove("opened");
  }
});

var cover = document.getElementById("activate");
activate.addEventListener("click", function (){
    this.classList.add("pushed");
    alarm.onload();
    alarm.currentTime = 10.1;
    alarm.play();
    setTimeout(function (){
        panel.classList.add("show");
        theCount = setInterval (showCountDown, 1000);
        alarm.load();
        alarm.play();
    }, 500);
});

var abort = document.getElementById("abort");
abort.addEventListener("click", function (){
    btn.classList.remove("pushed");
    panel.classList.remove("show");
    clearInterval(theCount);
    time.innerText = 9;
    alarm.pause();
    alarm.currentTime = 10;
    alarm.load();
});
var reload = document.getElementById("restart");
reload.addEventListener("click", function (){
    panel.classList.remove("show");
    turnOff.classList.remove("close");
    turnoffHor.classList.remove("close");
    abort.classList.remove("hide");
    detonate.classList.remove("show");
    cover.classList.remove("opened");
    btn.classList.remove("pushed");
    this.classList.remove("show");
    time.classList.remove("crono");
    time.innerText = 9;
});

setTimeout(function (){
    cover.classList.remove("opened");
}, 100);

var mute = document.getElementById("mute");
mute.addEventListener("click", function () {
    if (this.className= "muted") { 
        alarm.muted = false;
    } else {
        alarm.muted = true;
        this.classList.add("muted");
    } 
});
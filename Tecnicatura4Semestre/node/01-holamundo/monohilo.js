console.log("mono hilo")

var i = 0;

setInterval(function() {
    console.log(i);
    i++;
    
    //if(i == 5){
    //    console.log("formamos un error")
    //    var a = 3 + z;
    //}
}, 1000);
console.log("segun la instruccion");
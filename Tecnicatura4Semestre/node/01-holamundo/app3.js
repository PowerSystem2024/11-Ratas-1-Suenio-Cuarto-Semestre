console.log("inicio del programa"); //1
setTimeout(() =>{
    console.log("Primer timeOut"); //5
}, 3000);
setTimeout(() =>{
    console.log("Segundo timeOut"); //2
}, 0);
setTimeout(() =>{
    console.log("Tercero timeOut"); //3
}, 0);
console.log("fin del programa") //4
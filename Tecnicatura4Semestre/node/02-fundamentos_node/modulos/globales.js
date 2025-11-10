/*se comento los ejemplos
this === global = true

Mostrar algo en consola
console.log();

mostrar un mensaje en forma de error
console.error();

Ejecutar un codigo despues de un intervalo de tiempo
setTimeout(() => {});

Ejecutar un codigo cada intervalo de tiempo
setInterval(() => {});

Da prioridad de ejecucion a una funcion asincronica
setImmdiate(() => {});*/
//console.log(setInterval);

let i=0;
let intervalo = setInterval(() => {
    console.log(`Hola`);
    if (i === 3) {
        clearInterval(intervalo); //detenemos la funcion
    }
    i++;
}, 1000); 

//va a ser lo primero que se ejecuta y despues lo asincrono
setImmediate(() => {
    console.log(`Saludo inmediato`);
})

//estos se usan para ver en consola

//se utiliza en cualquier lugar para acceder a archivos de node.js 
//require();

//nos muestra los procesos que maneja node versin, modulos, etc
//console.log(process);

//nos muestra el directorio donde estamos trabajando
//console.log(__dirname);

//nos muestra el archivo que estamos trabajando y ejecutando
//console.log(__filename);

globalThis.miVariable = `mi variable global`;
console.log(miVariable);

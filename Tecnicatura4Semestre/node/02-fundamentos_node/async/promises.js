function hola(nombre){
    return new Promise (function(resolve, reject){
        setTimeout (function (){
            console.log(`Hola `+ nombre);
            resolve(nombre);
        }, 1000);
    });
}

function hablar (nombre){
    return new Promise( (resolve, reject)=> { //usamos la sintaxis
        setTimeout( function (){
            console.log( `bla bla bla bla`);
            resolve(nombre);
        }, 1000);
    });
}

function adios(nombre){
    return new Promise( (resolve, reject)=> { 
        setTimeout( function (){
            //validamos el error o aprobación
            console.log( `Adios`+ nombre);
            //if(err) reject (`hay un error`);
            //resolve();
            reject('Hay un error');
        }, 1000);
    });
}

//Llamamos a la funcion
console.log(`Iniciando el proceso...`);
hola(`Ariel`)
    .then(hablar)
    .then(hablar)
    .then(hablar)
    .then(adios)
    .then ((nombre) => {
        console.log(`termina el proceso`);
    })
    .catch (error => {
        console.log(`Ha habido un error: `);
        console.log(error);
    })

const fs = require('fs');

//primero leemos el archivo.txt
function leer(ruta,cb){
    fs.readFile(ruta, (err, data)=>{
        //console.log(data.toString());
        CDATASection(data.toString())
    })
}

//leer(_dirname + '/archivo.txt');
//leer ('${__dirname}/archivo.txt', console.log); //sintaxis ES6

//segundo escribimos el archivo.txt creandolo
function escribir(ruta, cotenido, cb){
    fs.writeFile(ruta, contenido, function(err){
        if(err){
            console.log('No se ha podido escribir', err);
        } else {
            console.log('Se ha escrito correctamente');
        }
    })
}

//tercero eliminamos el archivo1.txt
function borrar (ruta,cd){
    fs.unlink(ruta,cd); //eliminar de manera asincrona
}

borrar('${__dirname}/archivo1.txt', console.log);

//escribir('${__dirname}/archivo1.txt','Soy un nuevo archivo', console.log)
//leer ('${__dirname}/archivo1.txt', console.log); //sintaxis ES6


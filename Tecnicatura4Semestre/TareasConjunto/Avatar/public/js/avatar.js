// Variables globales
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonPersonajeJugador = document.getElementById('boton-personaje');
const sectionReiniciar = document.getElementById('reiniciar')
const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
const inputZuko = document.getElementById('zuko')
const inputKatara = document.getElementById('katara')
const inputAang = document.getElementById('aang')
const inputToph = document.getElementById('toph')
const spanPersonajeJugador = document.getElementById('personaje-jugador')
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensaje = document.getElementById('mensajes')
const parrafo = document.createElement('p')

const juego = {
    ataqueJugador: "",
    ataqueEnemigo: "",
    vidasJugador: 3,
    vidasEnemigo: 3
}

class Avatar {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.vida = vida
        this.ataques = [] 
    }
}

let zuko = new Avatar('Zuko', './assets/Zuko.png', 3)
let katara = new Avatar('Katara', './assets/Katara.png', 3)
let aang = new Avatar('Aang', './assets/Aang.png', 3)
let toph = new Avatar('Toph', './assets/Toph.png', 3)

zuko.ataques.push(
    { nombre: 'Punioo', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

katara.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

aang.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

toph.ataques.push(
    { nombre: 'Punio', id: 'boton-punio' },
    { nombre: 'Patada', id: 'boton-patada' },
    { nombre: 'Barrida', id: 'boton-barrida' }
)

let personajes = [zuko, katara, aang, toph];
let personajeJugador;

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    sectionReiniciar.style.display = "none"

    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);
    //document.getElementById('boton-jugar').style.display = 'none';
    //document.getElementById('seleccionar-personaje').style.display = 'block';
    
    // Botones de ataque
    //document.getElementById('boton-punio').addEventListener('click', () => ataque("Punio"))
    //document.getElementById('boton-patada').addEventListener('click', () => ataque("Patada"))
    //document.getElementById('boton-barrida').addEventListener('click', () => ataque("Barrida"))
    
    // Botón reiniciar
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego)
}

function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
    document.getElementById('boton-jugar').style.display = 'block';
    document.getElementById('boton-reglas').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'none';
    document.getElementById('boton-jugar').addEventListener('click', seleccionarPersonajeJugador);
}

function seleccionarPersonajeJugador() {
    
    sectionSeleccionarAtaque.style.display = 'block'; 
    document.getElementById('boton-reglas').style.display = 'none';
    sectionSeleccionarPersonaje.style.display = 'none' 

    if (inputZuko.checked) {
        spanPersonajeJugador.innerHTML = 'Zuko'
        personajeJugador = zuko
    }
        
    else if (inputKatara.checked) {
        spanPersonajeJugador.innerHTML = 'Katara'
        personajeJugador = katara
    }
    else if (inputAang.checked) {
        spanPersonajeJugador.innerHTML = 'Aang'
        personajeJugador = aang
    }
    else if (inputToph.checked) {
        spanPersonajeJugador.innerHTML = 'Toph'
        personajeJugador = toph
    }
    else {
        let mensajeError = document.createElement("p") 
        mensajeError.innerHTML = 'Selecciona un personaje'
        mensajeError.style.color = "red"
        sectionSeleccionarPersonaje.appendChild(mensajeError)

        setTimeout(() => sectionSeleccionarPersonaje.removeChild(mensajeError), 2000)
        reiniciarJuego()
        return
    }
    mostrarAtaques(personajeJugador.ataques)
    seleccionarPersonajeEnemigo()
}

function mostrarAtaques(ataques) {
    const contenedorAtaques = document.getElementById('contenedor-ataques')
    contenedorAtaques.innerHTML = ""

    ataques.forEach(ataque => {
        let boton = document.createElement("button")
        boton.id = ataque.id
        boton.innerText = ataque.nombre
        boton.addEventListener('click', () => ataqueJugador(ataque.nombre))
        contenedorAtaques.appendChild(boton)
    })
}

function ataqueJugador(nombreAtaque) {
    juego.ataqueJugador = nombreAtaque
    ataqueAleatorioEnemigo()
}

function seleccionarPersonajeEnemigo() { 
    let personajeAleatorio = aleatorio(1, 4) 
    if (personajeAleatorio == 1) spanPersonajeEnemigo.innerHTML = 'Zuko'
    else if (personajeAleatorio == 2) spanPersonajeEnemigo.innerHTML = 'Katara'
    else if (personajeAleatorio == 3) spanPersonajeEnemigo.innerHTML = 'Aang'
    else spanPersonajeEnemigo.innerHTML = 'Toph'
}

function ataque(tipo) { 
    juego.ataqueJugador = tipo
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)
    juego.ataqueEnemigo = ataqueAleatorio == 1 ? 'Punio' 
                        : ataqueAleatorio == 2 ? 'Patada' 
                        : 'Barrida'
    combate()
}

function combate() {

    if (juego.ataqueEnemigo == juego.ataqueJugador) {
        crearMensaje("EMPATE")
    } else if (
        (juego.ataqueJugador == 'Punio' && juego.ataqueEnemigo == 'Barrida') ||
        (juego.ataqueJugador == 'Patada' && juego.ataqueEnemigo == 'Punio') ||
        (juego.ataqueJugador == 'Barrida' && juego.ataqueEnemigo == 'Patada')
    ) {
        crearMensaje("GANASTE")
        juego.vidasEnemigo--
        spanVidasEnemigo.innerHTML = juego.vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        juego.vidasJugador--
        spanVidasJugador.innerHTML = juego.vidasJugador
    }
    revisarVidas()
}

function revisarVidas(){
    if(juego.vidasEnemigo == 0){
        crearMensajeFinal("FELICITACIONES!!! HAS GANADO 🤩🥳🎉")
    } else if(juego.vidasJugador == 0){
        crearMensajeFinal("QUE PENA, HAS PERDIDO 😢😭😭😭")
    }
}

function crearMensajeFinal(resultado) {
    document.getElementById('reiniciar').style.display = "block"
    parrafo.innerHTML = resultado
    sectionMensaje.appendChild(parrafo)

    //document.getElementById('boton-punio').disabled = true
    //document.getElementById('boton-patada').disabled = true
    //document.getElementById('boton-barrida').disabled = true

    const botonesAtaque = document.querySelectorAll("#contenedor-ataques button")
    botonesAtaque.forEach(boton => boton.disabled = true)
}

function crearMensaje(resultado) {
    parrafo.innerHTML = `Tu personaje atacó con ${juego.ataqueJugador}, el personaje del enemigo atacó con ${juego.ataqueEnemigo} → ${resultado}`
    sectionMensaje.appendChild(parrafo)
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)

// Un solo objeto global para guardar todo
const juego = {
    ataqueJugador: "",
    ataqueEnemigo: "",
    vidasJugador: 3,
    vidasEnemigo: 3
}

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    let botonPersonajeJugador = document.getElementById('boton-personaje');
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = "none"

    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);

    document.getElementById('boton-jugar').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'block';

    // Botones de ataque
    document.getElementById('boton-punio').addEventListener('click', () => ataque("Punio"))
    document.getElementById('boton-patada').addEventListener('click', () => ataque("Patada"))
    document.getElementById('boton-barrida').addEventListener('click', () => ataque("Barrida"))

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
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'block'; 
    document.getElementById('boton-reglas').style.display = 'none';
    let sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje')
    sectionSeleccionarPersonaje.style.display = 'none' 
   
    let inputZuko = document.getElementById('zuko')
    let inputKatara = document.getElementById('katara')
    let inputAang = document.getElementById('aang')
    let inputToph = document.getElementById('toph')
    let spanPersonajeJugador = document.getElementById('personaje-jugador')

    if (inputZuko.checked) spanPersonajeJugador.innerHTML = 'Zuko'
    else if (inputKatara.checked) spanPersonajeJugador.innerHTML = 'Katara'
    else if (inputAang.checked) spanPersonajeJugador.innerHTML = 'Aang'
    else if (inputToph.checked) spanPersonajeJugador.innerHTML = 'Toph'
    else {
        let mensajeError = document.createElement("p") 
        mensajeError.innerHTML = 'Selecciona un personaje'
        mensajeError.style.color = "red"
        sectionSeleccionarPersonaje.appendChild(mensajeError)

        setTimeout(() => sectionSeleccionarPersonaje.removeChild(mensajeError), 2000)
        reiniciarJuego()
        return
    }
    seleccionarPersonajeEnemigo()
}

function seleccionarPersonajeEnemigo() { 
    let personajeAleatorio = aleatorio(1, 4) 
    let spanPersonajeEnemigo = document.getElementById('personaje-enemigo')

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
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

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
    let sectionMensaje = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultado
    sectionMensaje.appendChild(parrafo)

    document.getElementById('boton-punio').disabled = true
    document.getElementById('boton-patada').disabled = true
    document.getElementById('boton-barrida').disabled = true
}

function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
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

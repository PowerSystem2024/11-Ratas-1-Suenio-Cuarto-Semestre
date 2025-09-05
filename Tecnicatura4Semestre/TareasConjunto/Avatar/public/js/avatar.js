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

let personajeJugador;
let personajeEnemigo;

const juego = {
    ataqueJugador: "",
    ataqueEnemigo: "",
    vidasJugador: 3,
    vidasEnemigo: 3
}

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);

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
    sectionSeleccionarAtaque.style.display = 'block'; 
    document.getElementById('boton-reglas').style.display = 'none';
    sectionSeleccionarPersonaje.style.display = 'none' 

    if (inputZuko.checked) personajeJugador = new Personaje("Zuko");
    else if (inputKatara.checked) personajeJugador = new Personaje("Katara");
    else if (inputAang.checked) personajeJugador = new Personaje("Aang");
    else if (inputToph.checked) personajeJugador = new Personaje("Toph");
    else {
      let mensajeError = document.createElement("p");
      mensajeError.innerHTML = 'Selecciona un personaje';
      mensajeError.style.color = "red";
      sectionSeleccionarPersonaje.appendChild(mensajeError);
      
      setTimeout(() => sectionSeleccionarPersonaje.removeChild(mensajeError), 2000);
      reiniciarJuego();
      return;
    }
    
    spanPersonajeJugador.innerHTML = personajeJugador.nombre;
    seleccionarPersonajeEnemigo();
}

function seleccionarPersonajeEnemigo() { 
  const nombres = ["Zuko", "Katara", "Aang", "Toph"];
  const nombreAleatorio = nombres[aleatorio(0, nombres.length - 1)];
  personajeEnemigo = new Personaje(nombreAleatorio);
  spanPersonajeEnemigo.innerHTML = personajeEnemigo.nombre;
}

function ataque(tipo) {
  const ataqueJugador = tipo;
  const ataqueEnemigo = personajeEnemigo.ataqueAleatorio();
  combate(ataqueJugador, ataqueEnemigo);
}

function combate(ataqueJugador, ataqueEnemigo) {
  if (ataqueJugador === ataqueEnemigo) {
    crearMensaje("EMPATE", ataqueJugador, ataqueEnemigo);
  } else if (
    (ataqueJugador === 'Puño' && ataqueEnemigo === 'Barrida') ||
    (ataqueJugador === 'Patada' && ataqueEnemigo === 'Puño') ||
    (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
  ) {
    personajeEnemigo.perderVida();
    spanVidasEnemigo.innerHTML = personajeEnemigo.vidas;
    crearMensaje("GANASTE", ataqueJugador, ataqueEnemigo);
  } else {
    personajeJugador.perderVida();
    spanVidasJugador.innerHTML = personajeJugador.vidas;
    crearMensaje("PERDISTE", ataqueJugador, ataqueEnemigo);
  }

  revisarVidas();
}

function revisarVidas() {
  if (!personajeEnemigo.estaVivo()) {
    crearMensajeFinal("FELICITACIONES!!! HAS GANADO 🤩🥳🎉");
  } else if (!personajeJugador.estaVivo()) {
    crearMensajeFinal("QUE PENA, HAS PERDIDO 😢😭");
  }
}

function crearMensajeFinal(resultado) {
    document.getElementById('reiniciar').style.display = "block"
    parrafo.innerHTML = resultado
    sectionMensaje.appendChild(parrafo)
    document.getElementById('boton-punio').disabled = true
    document.getElementById('boton-patada').disabled = true
    document.getElementById('boton-barrida').disabled = true
}

function crearMensaje(resultado, ataqueJugador, ataqueEnemigo) {
  parrafo.innerHTML = `Tu personaje atacó con ${ataqueJugador}, el personaje del enemigo atacó con ${ataqueEnemigo} → ${resultado}`;
  sectionMensaje.appendChild(parrafo);
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
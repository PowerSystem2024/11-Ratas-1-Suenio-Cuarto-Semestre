// ===================== CLASE PERSONAJE =====================
class Personaje {
    constructor(nombre, vidas = 3) {
      this.nombre = nombre;
      this.vidas = vidas;
      this.ataques = ["Puño", "Patada", "Barrida"]; 
    }
  
    perderVida() {
      this.vidas--;
    }
  
    estaVivo() {
      return this.vidas > 0;
    }
  
    ataqueAleatorio() {
      return this.ataques[Math.floor(Math.random() * this.ataques.length)];
    }
  }
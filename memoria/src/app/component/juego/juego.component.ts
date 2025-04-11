import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-juego',
  imports: [FormsModule],
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})

export class JuegoComponent implements OnInit {
  // Variables del juego
  tarjetasDestapadas: number = 0;
  tarjeta1: HTMLElement | null = null;
  tarjeta2: HTMLElement | null = null;
  primerResultado: number | null = null;
  segundoResultado: number | null = null;
  movimientos: number = 0;
  aciertos: number = 0;
  temporizador: boolean = false;
  tiempo: number = 0;
  tiempoInicial: number = 60;
  tiempoRegresivoId: any = null;
  numeros: number[] = [];
  rondaTerminada: boolean = false;


  // Audios
  audioGanar: HTMLAudioElement = new Audio();
  audioPerder: HTMLAudioElement = new Audio();
  audioClick: HTMLAudioElement = new Audio();
  audioError: HTMLAudioElement = new Audio();
  audioCorrecto: HTMLAudioElement = new Audio();

  // NUEVAS VARIABLES PARA JUGADORES
  jugadorActual: number = 1; // 1 o 2
  aciertosJugador1: number = 0;
  aciertosJugador2: number = 0;
  ganadasJugador1: number = 0;
  ganadasJugador2: number = 0;
  ganador: string = ''; // 'Jugador 1' o 'Jugador 2'
  nombreJugador1: string = '';
  nombreJugador2: string = '';
  juegoHabilitado: boolean = false;


  

    
  siguienteRonda(): void {
    // Aquí puedes mezclar las cartas de nuevo pero mantener el puntaje
    this.movimientos = 0;
    this.aciertos = 0;
    this.aciertosJugador1 = 0;
    this.aciertosJugador2 = 0;
    this.jugadorActual = 1;
    this.ganador = '';
    this.tiempo = 0;
    this.temporizador = false;
    clearInterval(this.tiempoRegresivoId);
    this.resetearTablero();

    this.rondaTerminada = false;
  }
  
  reiniciarDesdeCero(): void {
    this.movimientos = 0;
    this.aciertos = 0;
    this.aciertosJugador1 = 0;
    this.aciertosJugador2 = 0;
    this.ganadasJugador1 = 0;
    this.ganadasJugador2 = 0;
    this.jugadorActual = 1;
    this.tiempo = 0;
    this.temporizador = false;
    clearInterval(this.tiempoRegresivoId);
    this.resetearTablero();
  }
  
  cambiarJugador(): void {
    // En este caso reinicia también las victorias si se cambia de jugadores
    this.reiniciarDesdeCero();
    // Scroll al componente <app-juego>
    const juego = document.getElementById('registro');
    if (juego) {
      juego.scrollIntoView({ behavior: 'smooth' });
    };
  }
  
  resetearTablero(): void {
    this.tarjetasDestapadas = 0;
    this.numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].sort(() => Math.random() - 0.5);
    for (let i = 0; i <= 15; i++) {
      const tarjeta = document.getElementById(i.toString());
      if (tarjeta) {
        tarjeta.innerHTML = '';
        tarjeta.removeAttribute('disabled');
      }
    }
  }
  


  constructor() {
    // Inicializar arreglo de números
    this.numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    this.numeros = this.numeros.sort(() => Math.random() - 0.5);
    console.log(this.numeros);
  }

  ngOnInit(): void {
    const jugador1 = localStorage.getItem('jugador1');
    const jugador2 = localStorage.getItem('jugador2');
  
    if (!jugador1 || !jugador2) {
      alert('Por favor, registre los nombres de los jugadores primero.');
      this.juegoHabilitado = false;
      return;
    }

    this.nombreJugador1 = jugador1;
    this.nombreJugador2 = jugador2;
    this.juegoHabilitado = true;
    // Usar rutas absolutas con la barra al inicio
    this.audioGanar.src = "/sound/ganar.wav";
    this.audioPerder.src = "/sound/perder.wav";
    this.audioClick.src = "/sound/Click.wav";
    this.audioError.src = "/sound/error.wav";
    this.audioCorrecto.src = "/sound/correcto.wav";
  }

  contarTiempo(): void {
    this.tiempoRegresivoId = setInterval(() => {
      this.tiempo++;
    }, 1000);
  }

  bloquearTarjetas(): void {
    for (let i = 0; i <= 15; i++) {
      const tarjetaBloqueada = document.getElementById(i.toString());
      if (tarjetaBloqueada) {
        tarjetaBloqueada.innerHTML = `<img src="/Images/${this.numeros[i]}.png" alt="" style="width:80px;">`;
        tarjetaBloqueada.setAttribute('disabled', 'true');
      }
    }
  }

  destapar(id: number): void {
    if (!this.temporizador) {
      this.contarTiempo();
      this.temporizador = true;
    }
  
    this.tarjetasDestapadas++;
  
    if (this.tarjetasDestapadas === 1) {
      this.tarjeta1 = document.getElementById(id.toString());
      if (this.tarjeta1) {
        this.primerResultado = this.numeros[id];
        this.tarjeta1.innerHTML = `<img src="/Images/${this.primerResultado}.png" alt="" style="width:80px;">`;
        this.audioClick.play();
        this.tarjeta1.setAttribute('disabled', 'true');
      }
    } else if (this.tarjetasDestapadas === 2) {
      this.tarjeta2 = document.getElementById(id.toString());
      if (this.tarjeta2) {
        this.segundoResultado = this.numeros[id];
        this.tarjeta2.innerHTML = `<img src="/Images/${this.segundoResultado}.png" alt="" style="width:80px;">`;
        this.tarjeta2.setAttribute('disabled', 'true');
        this.movimientos++;
  
        if (this.primerResultado === this.segundoResultado) {
          this.tarjetasDestapadas = 0;
          this.aciertos++;
          this.audioCorrecto.play();
  
          // Aumentar acierto al jugador correspondiente
          if (this.jugadorActual === 1) {
            this.aciertosJugador1++;
          } else {
            this.aciertosJugador2++;
          }
  
          if (this.aciertos === 8) {
            this.audioGanar.play();
            clearInterval(this.tiempoRegresivoId);
  
            // Asignar victoria
            if (this.aciertosJugador1 > this.aciertosJugador2) {
              this.ganadasJugador1++;
              this.ganador = `¡${this.nombreJugador1} ha ganado! 🥳🎉`;
            } else if (this.aciertosJugador2 > this.aciertosJugador1) {
              this.ganadasJugador2++;
              this.ganador = `¡${this.nombreJugador2} ha ganado! 🥳🎉`;
            } else {
              this.ganador = '¡Es un Empate!🔥';
            }
            // ✅ Activar botón de siguiente ronda
            this.rondaTerminada = true;
            
          }
        } else {
          this.audioError.play();
  
          // Cambiar de turno si fallan
          setTimeout(() => {
            if (this.tarjeta1 && this.tarjeta2) {
              this.tarjeta1.innerHTML = '';
              this.tarjeta2.innerHTML = '';
              this.tarjeta1.removeAttribute('disabled');
              this.tarjeta2.removeAttribute('disabled');
              this.tarjetasDestapadas = 0;
  
              // Cambiar turno de jugador
              this.jugadorActual = this.jugadorActual === 1 ? 2 : 1;
            }
          }, 800);
        }
      }
    }
  }
  
}
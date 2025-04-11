import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombreJugador1: string = '';
  nombreJugador2: string = '';

  irAJuego(): void {
    if (!this.nombreJugador1 || !this.nombreJugador2) {
      alert('Debe ingresar ambos nombres');
      return;
    }
    localStorage.setItem('jugador1', this.nombreJugador1);
    localStorage.setItem('jugador2', this.nombreJugador2);
    
    //Actualizar la página para que se reflejen los cambios
    
    // Scroll al componente <app-juego>
    const juego = document.getElementById('juego');
    if (juego) {
      juego.scrollIntoView({ behavior: 'smooth' });
    };
  }
  
}

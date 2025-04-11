import { Component } from '@angular/core';
import { RegistroComponent } from '../../component/registro/registro.component';
import { JuegoComponent } from '../../component/juego/juego.component';

@Component({
  selector: 'app-home',
  imports: [RegistroComponent, JuegoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

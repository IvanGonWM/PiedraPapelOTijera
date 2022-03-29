import { Component } from '@angular/core';
import { InfoRondas } from '../InfoRondas';
import { tablaService } from '../tablaService';

@Component({
  selector: 'app-tablapuntuaciones',
  templateUrl: './tablapuntuaciones.component.html',
  styleUrls: ['./tablapuntuaciones.component.css'],
})
export class TablapuntuacionesComponent {
  public rondas: InfoRondas[] = [];

  constructor(public servicio : tablaService) {
    // console.log(this.servicio.recargarTabla())
  }

}
import { Component, OnInit } from '@angular/core';
import { InfoRondas } from '../InfoRondas';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.css'],
})
export class MainscreenComponent implements OnInit {
  public strTitulo = 'Ingrese el nombre de los jugadores:';
  public rondas: InfoRondas[] = [];
  
  intercambiarTitulo(titulo: string) 
  {
    this.strTitulo = titulo;
  }

  sumarRonda(item: InfoRondas)
  {
    this.rondas.push(item)
  }
  constructor() {}

  ngOnInit(): void {}
}

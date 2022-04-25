import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { facadeService } from '../facade.service';
import { Observable } from 'rxjs';
import { GanadorRonda } from '../ganadorRonda';
import { InfoRondas } from '../InfoRondas';
import { Elemento } from '../elemento';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  constructor(private fb: FormBuilder, private servicioFachada: facadeService) {
    this.jugarForm = this.fb.group({
      jugador1: ['', Validators.required],
      jugador2: ['', Validators.required],
      eleccion1: ['', Validators.required],
      eleccion2: ['', Validators.required],
    });
  }

  jugarForm: FormGroup;
  numRonda = 1;
  idPartida = 0;
  ultimoGanador: GanadorRonda = { ganador: '', final: false };

  @Output() nuevoTitulo = new EventEmitter<string>();
  @Output() nuevaRonda = new EventEmitter<InfoRondas>();

  posibilidades$!: Observable<Elemento[]>;

  //VIEWS
  mostrarNombres: boolean = true;
  mostrarElecciones1: boolean = false;
  mostrarElecciones2: boolean = false;
  mostrarGanador: boolean = false;
  mostrarFinal: boolean = false;

  //OUTPUTSTRINGS
  fraseRonda: string = '';

  cambiarTitulo(titulo: string) {
    this.nuevoTitulo.emit(titulo);
  }

  agregarRonda(infoRonda: InfoRondas) {
    this.nuevaRonda.emit(infoRonda);
  }

  mostrarJugadas1() {
    this.mostrarNombres = false;
    this.mostrarElecciones1 = true;
  }

  mostrarJugadas2() {
    this.mostrarElecciones1 = false;
    this.mostrarElecciones2 = true;
  }

  mostrarGanadorRonda() {
    this.mostrarElecciones2 = false;
    this.mostrarGanador = true;
  }

  mostrarFin() {
    this.mostrarElecciones2 = false;
    this.mostrarFinal = true;
  }

  jugarPartida() {
    this.servicioFachada
      .postPartida(
        this.jugarForm.get('jugador1')?.value,
        this.jugarForm.get('jugador2')?.value
      )
      .subscribe((data) => {
        this.idPartida = data.id;
        this.cambiarTitulo(`Empezo el juego: Ronda ${this.numRonda}`);
        this.mostrarJugadas1();
      });
  }

  jugarRonda() {
    this.servicioFachada.postRonda(
      this.jugarForm.get('eleccion1')?.value.nombre,
      this.jugarForm.get('eleccion2')?.value.nombre,
      this.numRonda,
      this.idPartida,
    ).subscribe ((data) => {
      if (data.final == true) {
      this.cambiarTitulo(`EL GANADOR DE LA PARTIDA ES ${data.ganador.toUpperCase()}!! SIUUUUU`);
      this.agregarRonda({
        ronda: this.numRonda,
        ganador: `${data.ganador} - Final`,
      });
      this.mostrarFin();
    } else if (data.ganador == '') {
      this.cambiarTitulo(`En la ronda ${this.numRonda} hubo un empate`);
      this.numRonda++;
      this.fraseRonda = `Proceda a la ronda ${this.numRonda}`;
      this.mostrarGanadorRonda();
    } else {
      this.cambiarTitulo(`El ganador de la ronda ${this.numRonda} fue ${data.ganador}`);
      this.agregarRonda({
        ronda: this.numRonda,
        ganador: data.ganador,
      });
      this.numRonda++;
      this.fraseRonda = `Bien jugado ${data.ganador}, procedan a la ronda ${this.numRonda}`;
      this.mostrarGanadorRonda();
      }
    });
  }

  volverAEleccion() {
    this.mostrarGanador = false;
    this.mostrarElecciones1 = true;
    this.jugarForm.get('eleccion1')?.reset();
    this.jugarForm.get('eleccion2')?.reset();
    this.cambiarTitulo(`Ronda ${this.numRonda}`);
  }

  botonFinal() {
    window.location.reload();
  }

  ngOnInit(): void {
    this.posibilidades$ = this.servicioFachada.getElementos();
  }
}

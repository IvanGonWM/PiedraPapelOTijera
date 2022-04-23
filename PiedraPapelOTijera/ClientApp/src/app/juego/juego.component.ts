import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { facadeService } from '../facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  constructor(private fb: FormBuilder, private servicioFachada: facadeService) {
    this.form = this.fb.group({
      jugador1: ['', Validators.required],
      jugador2: ['', Validators.required],
      eleccion1: ['', Validators.required],
      eleccion2: ['', Validators.required],
    });
  }

  form: FormGroup;
  datosPartida = { ronda: 1, ganadasP1: 0, ganadasP2: 0 };
  posibilidades: string[] = ['Piedra', 'Papel', 'Tijera'];

  @Output() nuevoTitulo = new EventEmitter<string>();
  @Output() nuevaRonda = new EventEmitter<string>();

  posibilidades$!: Observable<string[]>;

  //VIEWS
  mostrarNombres: boolean = true;
  mostrarElecciones1: boolean = false;
  mostrarElecciones2: boolean = false;
  mostrarGanador: boolean = false;
  mostrarFinal: boolean = false;

  //OUTPUTSTRINGS
  fraseRonda: string = '';
  nombreGanador: string = '';

  cambiarTitulo(titulo: string) {
    this.nuevoTitulo.emit(titulo);
  }

  agregarRonda(nombreGanador: string) {
    this.nuevaRonda.emit(nombreGanador);
  }

  mostrarJugadas1() {
    this.mostrarNombres = false;
    this.mostrarElecciones1 = true;
    this.cambiarTitulo(`Ronda ${this.datosPartida['ronda']}`);
  }

  mostrarJugadas2() {
    this.mostrarElecciones1 = false;
    this.mostrarElecciones2 = true;
  }

  jugarRonda() {
    // if (
    //   this.form.get('eleccion1')?.value === this.form.get('eleccion2')?.value
    // ) {
    //   this.fraseRonda = 'Hubo un empate';
    //   return;
    // } else if (this.form.get('eleccion1')?.value === 'Piedra') {
    //   if (this.form.get('eleccion2')?.value === 'Papel') {
    //     this.fraseRonda = `El ganador de la ronda ${
    //       this.datosPartida['ronda']
    //     } es \n${this.form.get('jugador2')?.value}`;
    //     this.datosPartida['ganadasP2']++;
    //     this.nombreganador = this.form.get('jugador2')?.value;
    //   } else if (this.form.get('eleccion2')?.value === 'Tijera') {
    //     this.fraseRonda = `El ganador de la ronda ${
    //       this.datosPartida['ronda']
    //     } es \n${this.form.get('jugador1')?.value}`;
    //     this.datosPartida['ganadasP1']++;
    //     this.nombreganador = this.form.get('jugador1')?.value;
    //   }
    // } else if (this.form.get('eleccion1')?.value === 'Papel') {
    //   if (this.form.get('eleccion2')?.value === 'Tijera') {
    //     this.fraseRonda = `El ganador de la ronda ${
    //       this.datosPartida['ronda']
    //     } es \n${this.form.get('jugador2')?.value}`;
    //     this.datosPartida['ganadasP2']++;
    //     this.nombreganador = this.form.get('jugador2')?.value;
    //   } else if (this.form.get('eleccion2')?.value === 'Piedra') {
    //     this.fraseRonda = `El ganador de la ronda ${
    //       this.datosPartida['ronda']
    //     } es \n${this.form.get('jugador1')?.value}`;
    //     this.datosPartida['ganadasP1']++;
    //     this.nombreganador = this.form.get('jugador1')?.value;
    //   }
    // } else if (this.form.get('eleccion1')?.value === 'Tijera') {
    //   if (this.form.get('eleccion2')?.value === 'Papel') {
    //     this.fraseRonda = `El ganador de la ronda ${
    //       this.datosPartida['ronda']
    //     } es \n${this.form.get('jugador1')?.value}`;
    //     this.datosPartida['ganadasP1']++;
    //     this.nombreganador = this.form.get('jugador1')?.value;
    //   } else if (this.form.get('eleccion2')?.value === 'Piedra') {
    //     this.fraseRonda = `El ganador de la ronda ${
    //       this.datosPartida['ronda']
    //     } es \n${this.form.get('jugador2')?.value}`;
    //     this.datosPartida['ganadasP2']++;
    //     this.nombreganador = this.form.get('jugador2')?.value;
    //   }
    // }
    // this.inforondas = new InfoRondas();
    // this.inforondas.ronda = this.datosPartida['ronda'];
    // this.inforondas.ganador = this.nombreganador;
    // const headers = { 'Content-Type': 'application/json', Accept: '*/*' };
    // this._httpClient
    //   .post<any>('https://localhost:44443/inforondas', this.inforondas, {
    //     headers,
    //   })
    //   .subscribe();
    // this.agregarRonda(this.inforondas);
  }

  jugarRondaNuevo() {}

  mostrarResultado() {
    this.mostrarElecciones2 = false;
    this.jugarRonda();
    if (this.datosPartida['ganadasP1'] === 3) {
      this.mostrarFinal = true;
      this.cambiarTitulo(
        `El ganador es ${this.form.get('jugador1')?.value}!! SAPEEEEE`
      );
    } else if (this.datosPartida['ganadasP2'] === 3) {
      this.mostrarFinal = true;
      this.cambiarTitulo(
        `El ganador es ${this.form.get('jugador2')?.value}!! SAPEEEEE`
      );
    } else {
      this.mostrarGanador = true;
      this.datosPartida['ronda']++;
      this.cambiarTitulo(`Proceda a la ronda ${this.datosPartida['ronda']}`);
    }
  }

  volverAEleccion() {
    this.mostrarGanador = false;
    this.mostrarElecciones1 = true;
    this.cambiarTitulo(`Ronda ${this.datosPartida['ronda']}`);
  }

  botonFinal() {
    window.location.reload();
  }

  ngOnInit(): void {
    this.posibilidades$ = this.servicioFachada.getElementos();
  }
}

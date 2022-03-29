import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoRondas } from '../InfoRondas';
import { tablaService } from '../tablaService';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
})
export class JuegoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _httpClient: HttpClient,
    private service: tablaService
  ) {
    this.form = this.fb.group({
      jugador1: ['', Validators.required],
      jugador2: ['', Validators.required],
      eleccion1: ['', Validators.required],
      eleccion2: ['', Validators.required],
    });
  }

  @Output() nuevoTitulo = new EventEmitter<string>();

  @Output() nuevaRonda = new EventEmitter<InfoRondas>();

  datosPartida = { ronda: 1, ganadasP1: 0, ganadasP2: 0 };
  public posibilidades: string[] = ['Piedra', 'Papel', 'Tijera'];
  public mostrarNombres: boolean = true;
  public mostrarElecciones1: boolean = false;
  public mostrarElecciones2: boolean = false;
  public mostrarGanador: boolean = false;
  public mostrarFinal: boolean = false;
  public fraseRonda: string = '';
  nombreganador: string = '';

  form: FormGroup;
  inforondas: InfoRondas = { ronda: 0, ganador: '' };

  cambiarTitulo(titulo: string) {
    this.nuevoTitulo.emit(titulo);
  }

  agregarRonda(item: InfoRondas) {
    this.nuevaRonda.emit(item);
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

  // getUltimaRonda(): any {
  //   this._httpClient
  //     .get<InfoRondas[]>('https://localhost:44443/inforondas')
  //     .subscribe(
  //       (result) => {
  //         console.log(result[result.length - 1]);
  //         console.log(result);
  //         return result[result.length - 1];
  //       },
  //       (error) => console.error(error)
  //     );
  // }
//FUNCIONA PERO NO FUE IMPLEMENTADO


  jugarRonda() {
    if (
      this.form.get('eleccion1')?.value === this.form.get('eleccion2')?.value
    ) {
      this.fraseRonda = 'Hubo un empate';
      return;
    } else if (this.form.get('eleccion1')?.value === 'Piedra') {
      if (this.form.get('eleccion2')?.value === 'Papel') {
        this.fraseRonda = `El ganador de la ronda ${
          this.datosPartida['ronda']
        } es \n${this.form.get('jugador2')?.value}`;
        this.datosPartida['ganadasP2']++;
        this.nombreganador = this.form.get('jugador2')?.value;
      } else if (this.form.get('eleccion2')?.value === 'Tijera') {
        this.fraseRonda = `El ganador de la ronda ${
          this.datosPartida['ronda']
        } es \n${this.form.get('jugador1')?.value}`;
        this.datosPartida['ganadasP1']++;
        this.nombreganador = this.form.get('jugador1')?.value;
      }
    } else if (this.form.get('eleccion1')?.value === 'Papel') {
      if (this.form.get('eleccion2')?.value === 'Tijera') {
        this.fraseRonda = `El ganador de la ronda ${
          this.datosPartida['ronda']
        } es \n${this.form.get('jugador2')?.value}`;
        this.datosPartida['ganadasP2']++;
        this.nombreganador = this.form.get('jugador2')?.value;
      } else if (this.form.get('eleccion2')?.value === 'Piedra') {
        this.fraseRonda = `El ganador de la ronda ${
          this.datosPartida['ronda']
        } es \n${this.form.get('jugador1')?.value}`;
        this.datosPartida['ganadasP1']++;
        this.nombreganador = this.form.get('jugador1')?.value;
      }
    } else if (this.form.get('eleccion1')?.value === 'Tijera') {
      if (this.form.get('eleccion2')?.value === 'Papel') {
        this.fraseRonda = `El ganador de la ronda ${
          this.datosPartida['ronda']
        } es \n${this.form.get('jugador1')?.value}`;
        this.datosPartida['ganadasP1']++;
        this.nombreganador = this.form.get('jugador1')?.value;
      } else if (this.form.get('eleccion2')?.value === 'Piedra') {
        this.fraseRonda = `El ganador de la ronda ${
          this.datosPartida['ronda']
        } es \n${this.form.get('jugador2')?.value}`;
        this.datosPartida['ganadasP2']++;
        this.nombreganador = this.form.get('jugador2')?.value;
      }
    }

    this.inforondas = new InfoRondas();
    this.inforondas.ronda = this.datosPartida['ronda'];
    this.inforondas.ganador = this.nombreganador;
    const headers = { 'Content-Type': 'application/json', Accept: '*/*' };
    this._httpClient
      .post<any>('https://localhost:44443/inforondas', this.inforondas, {
        headers,
      })
      .subscribe();
    this.agregarRonda(this.inforondas);
  }

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
        `El ganador es ${this.form.get('jugador2')?.value}!!\n SAPEEEEE`
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
  }
}

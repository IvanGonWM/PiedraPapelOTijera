import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GanadorRonda } from './ganadorRonda';
import { Elemento } from './elemento';
import { Partida } from './partida';
import { RespuestaPartida } from './respuestaPartida';

@Injectable()
export class facadeService {
  constructor(private _http: HttpClient) {}

  private url = 'https://localhost:7130/facade/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  public tempData: GanadorRonda = { ganador: '', final: false };
  public tempPartida: Partida = {
    Jugador1: '',
    Jugador2: '',
    Rondas: [],
  };
  public tempRespuestaPartida: RespuestaPartida = {
    id: 0,
    jugador1: '',
    jugador2: '',
    ganador: 0,
    rondas: [],
  };

  postPartida(nombre1: string, nombre2: string) {
    this.tempPartida.Jugador1 = nombre1;
    this.tempPartida.Jugador2 = nombre2;
    return this._http.post<RespuestaPartida>(
      this.url + 'partida',
      this.tempPartida,
      {
        headers: this.headers,
      }
    );
  }

  postRonda(
    jugada1: string,
    jugada2: string,
    ronda: number,
    idPartida: number
  ) {
    return this._http
      .post<GanadorRonda>(
        this.url + 'ronda',
        {
          Ronda: ronda,
          PartidaId: idPartida,
          Elemento1: jugada1,
          Elemento2: jugada2,
        },
        { headers: this.headers }
      )
  }

  postElemento(jugada: string, ganaContra: string) {
    this._http.post(
      this.url + 'jugadas',
      {
        Elemento1: jugada,
        Elemento2: ganaContra,
      },
      { headers: this.headers }
    ).subscribe();
  }

  getElementos(): Observable<Elemento[]> {
    return this._http.get<Elemento[]>(this.url + 'jugadas', {
      headers: this.headers,
    });
  }
}
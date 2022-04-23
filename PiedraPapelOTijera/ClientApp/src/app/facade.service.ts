import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class facadeService {
  constructor(private _http: HttpClient) {}

  private url = 'https://localhost:7130/facade/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: '*/*',
  });
  private rondasInicio: string[] = [];

  postPartida(nombre1: string, nombre2: string) {
    this._http.post(
      this.url + 'partida',
      {
        Jugador1: nombre1,
        Jugador2: nombre2,
        Rondas: this.rondasInicio,
      },
      { headers: this.headers }
    );
  }

  postRonda(
    jugada1: string,
    jugada2: string,
    ronda: number,
    idPartida: number
  ): Observable<Object> {
    return this._http.post(
      this.url + 'ronda',
      {
        Ronda: ronda,
        PartidaId: idPartida,
        Elemento1: jugada1,
        Elemento2: jugada2,
      },
      { headers: this.headers }
    );
  }

  postElemento(jugada: string, ganaContra: string) {
    this._http.post(
      this.url + 'jugadas',
      {
        Elemento1: jugada,
        Elemento2: ganaContra,
      },
      { headers: this.headers }
    );
  }

  getElementos(): Observable<string[]> {
    console.log(
      this._http.get<string[]>(this.url + 'jugadas', {
        headers: this.headers,
      })
    );
    return this._http.get<string[]>(this.url + 'jugadas', {
      headers: this.headers,
    });
  }
}

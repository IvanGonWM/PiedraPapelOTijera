import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoRondas } from './InfoRondas';

@Injectable()
export class tablaService {
  public rondas: InfoRondas[] = [];

  constructor(private _http: HttpClient) {
    this.recargarTabla();
  }

  recargarTabla(): any {
    this._http
      .get<InfoRondas[]>('https://localhost:44443/inforondas')
      .subscribe(
        (result) => {
          console.log(result)
          return result;
        },
        (error) => console.error(error)
      );
  }
}

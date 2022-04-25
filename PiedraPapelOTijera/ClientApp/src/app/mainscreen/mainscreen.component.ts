import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Elemento } from '../elemento';
import { facadeService } from '../facade.service';
import { InfoRondas } from '../InfoRondas';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.css'],
})
export class MainscreenComponent implements OnInit {
  constructor(private fb: FormBuilder, private servicioFachada: facadeService) {
    this.nuevaJugadaForm = this.fb.group({
      jugada: ['', Validators.required],
      ganaContra: ['', Validators.required],
    });
  }

  public strTitulo = 'Ingrese el nombre de los jugadores:';
  public rondas: InfoRondas[] = [];
  public jugadas$!: Observable<Elemento[]>;
  nuevaJugadaForm: FormGroup;
  nuevaJugadaInput: string = '';
  nuevaJugadaInput2: string = '';

  //VIEWS
  mostrarJugadasPosibles: boolean = true;
  mostrarAgregarJugadas: boolean = false;
  mostrarBorrarJugadas: boolean = false;

  intercambiarTitulo(titulo: string) {
    this.strTitulo = titulo;
  }

  sumarRonda(item: InfoRondas) {
    this.rondas.push(item);
  }

  mostrarCrear() {
    this.mostrarJugadasPosibles = false;
    this.mostrarAgregarJugadas = true;
  }

  mostrarBorrar() {
    this.mostrarJugadasPosibles = false;
    this.mostrarBorrarJugadas = true;
  }

  cancelarMostrar() {
    this.mostrarBorrarJugadas = false;
    this.mostrarAgregarJugadas = false;
    this.mostrarJugadasPosibles = true;
  }

  sumarJugada() {
    this.nuevaJugadaInput = this.nuevaJugadaForm.get('jugada')?.value;
    this.nuevaJugadaInput2 = this.nuevaJugadaForm.get('ganaContra')?.value;
    this.servicioFachada.postElemento(
      this.nuevaJugadaInput,
      this.nuevaJugadaInput2,
    );
    window.location.reload();
  }

  ngOnInit(): void {
    this.jugadas$ = this.servicioFachada.getElementos();
  }
}

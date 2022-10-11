import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreaService } from 'src/app/core/services/area.service';

@Component({
  selector: 'app-insertar-areas',
  templateUrl: './insertar-areas.component.html',
  styleUrls: ['./insertar-areas.component.scss']
})
export class InsertarAreasComponent implements OnInit {

  public nombre: string = '';
  public password: string = '';
  public texto: string = '';

  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  constructor(
    public router: Router,
    public serviceAreas: AreaService
  ) { }

  ngOnInit(): void {
  }

  addArea() {
    this.serviceAreas.registerAreas(this.opcionSeleccionado, this.texto).then((res) => {
      alert("Reto insertado para" + " " + this.opcionSeleccionado)
    }).catch(err => console.log('err', err.message));
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    console.log(this.verSeleccion)
  }
}
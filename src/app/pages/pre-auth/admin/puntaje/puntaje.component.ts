import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Puntaje } from 'src/app/core/models/Puntaje';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.scss'],
})
export class PuntajeComponent implements OnInit {
  puntaje: any[] = [];
  datosPuntaje: Puntaje[];
  public page!: number;
  constructor(
    public router: Router,
    public servicePuntuacion: PuntuacionService
  ) {}

  ngOnInit(): void {
    this.getPuntaje();
  }

  Agregar() {
    this.router.navigate(['admin/insertar-puntaje']);
  }

  getPuntaje() {
    this.servicePuntuacion.getPuntaje().then((datosPuntaje) => {
      return (this.puntaje = datosPuntaje);
    });
  }

  DeletePuntaje(idDocumentReto, id) {
    Swal.fire({
      title: '¿Deseas eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Deseo eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Eliminado Correctamente!',
          showConfirmButton: false,
          timer: 2500,
        });

        this.servicePuntuacion.deletePuntaje(idDocumentReto, id);
        this.getPuntaje();
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Puntaje } from 'src/app/core/models/Puntaje';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.scss'],
})
export class PuntajeComponent implements OnInit {
  idUser: string;
  puntaje: any[] = [];
  datosPuntaje: Puntaje[];
  public page!: number;
  constructor(
    public router: Router,
    public servicePuntuacion: PuntuacionService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.getPuntaje();
  }

  getPuntaje() {
    this.servicePuntuacion.getPuntajes().subscribe((datosPuntaje) => {
      this.puntaje = datosPuntaje;
    });
  }

  DeletePuntaje(id) {
    this.servicePuntuacion.getPuntajeByDocument(id).then((datoPuntaje) => {
      if (datoPuntaje) {
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

            this.servicePuntuacion.deletePuntaje(
              datoPuntaje[0]['idDocument'],
              id
            );
            this.getPuntaje();
          }
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { RetoService } from 'src/app/core/services/retos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reto-personal',
  templateUrl: './reto-personal.component.html',
  styleUrls: ['./reto-personal.component.scss'],
})
export class RetoPersonalComponent implements OnInit {
  retos: any[] = [];
  idUser: string;
  public page!: number;

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.getRetos();
  }

  Agregar() {
    this.router.navigate([
      `admin/${this.idUser}/insertar-retos/${this.idUser}`,
    ]);
  }

  getRetos() {
    this.serviceRetos.getRetoPersonal().subscribe((datosRetos) => {
      this.retos = datosRetos;
    });
  }

  DeleteRet(id) {
    this.serviceRetos.getByIdRetoPersonal(id).then((datoReto) => {
      if (datoReto) {
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

            this.serviceRetos.deleteRetoPersonal(datoReto[0]['idDocument'], id);
            this.getRetos();
          }
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { RetoService } from 'src/app/core/services/retos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminRetos',
  templateUrl: './adminRetos.component.html',
  styleUrls: ['./adminRetos.component.scss'],
})
export class AdminRetosComponent implements OnInit {
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
    this.serviceRetos.getRetoPersonalAll().subscribe((datosRetos) => {
      this.retos = datosRetos;
    });
  }

  DeleteRet(id) {
    this.serviceRetos.getById(id).then((datoReto) => {
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

            this.serviceRetos.deleteRetos(datoReto[0]['idDocument'], id);
            this.getRetos();
          }
        });
      }
    });
  }
}

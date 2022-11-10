import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DesafioService } from 'src/app/core/services/desafio.service';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-desafio',
  templateUrl: './admin-desafio.component.html',
  styleUrls: ['./admin-desafio.component.scss']
})
export class AdminDesafioComponent implements OnInit {
  idUser: string;
  desafios: any[] = [];
  public page!: number;

  constructor(
    public router: Router,
    public serviceDesafios: DesafioService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.getDesafios();
  }

  Agregar() {
    this.router.navigate([
      `admin/${this.idUser}/insertar-estudiantes/${this.idUser}`,
    ]);
  }

  getDesafios() {
    this.serviceDesafios.getDesafioAll().subscribe((datosEstudiantes) => {
      this.desafios = datosEstudiantes;
    });
  }

  DeleteUser(id) {
    this.serviceDesafios.getById(id).then((datoEstudiante) => {
      if (datoEstudiante) {
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

            this.serviceDesafios.deleteDesafios(
              datoEstudiante[0]['idDocument'],
              id
            );
            this.getDesafios();
          }
        });
      }
    });
  }
}

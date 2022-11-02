import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from 'src/app/core/services/estudiantes.service';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  idUser: string;
  estudiantes: any[] = [];
  public page!: number;

  constructor(
    public router: Router,
    public serviceEstudiante: EstudianteService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.getEmpleados();
  }

  Agregar() {
    this.router.navigate([
      `admin/${this.idUser}/insertar-estudiantes/${this.idUser}`,
    ]);
  }

  getEmpleados() {
    this.serviceEstudiante.getEstudiantesAll().subscribe((datosEstudiantes) => {
      this.estudiantes = datosEstudiantes;
    });
  }

  DeleteUser(id) {
    this.serviceEstudiante.getById(id).then((datoEstudiante) => {
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

            this.serviceEstudiante.deleteEstudiante(
              datoEstudiante[0]['idDocument'],
              id
            );
            this.getEmpleados();
          }
        });
      }
    });
  }
}

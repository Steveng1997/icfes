import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from 'src/app/core/services/estudiantes.service';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertar-estudiantes',
  templateUrl: './insertar-estudiantes.component.html',
  styleUrls: ['./insertar-estudiantes.component.scss'],
})
export class InsertarEstudiantesComponent implements OnInit {
  public nombre: string = '';
  idUser: string;

  constructor(
    public router: Router,
    public serviceEstudiante: EstudianteService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
  }

  addEstudiante() {
    if (this.nombre != '') {
      this.serviceEstudiante
        .registerAreas(this.nombre)
        .then((res) => {
          this.router.navigate([
            `admin/${this.idUser}/estudiantes/${this.idUser}`,
          ]);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Insertado Correctamente!',
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((err) => console.log('err', err.message));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo del nombre se encuentra vacìo',
      });
    }
  }
}

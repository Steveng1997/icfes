import { Component, OnInit } from '@angular/core';
//importamos el servicio
import { EstudianteService } from '../../../../../core/services/estudiantes.service';
import { LoginService } from 'src/app/core/services/login.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
//importamos el modelo
import { Estudiante } from 'src/app/core/models/estudiante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.scss'],
})
export class EditarEstudianteComponent implements OnInit {
  estud: Estudiante[];
  idUser: string;

  constructor(
    public router: Router,
    public serviceEstudiante: EstudianteService,
    public serviceLogin: LoginService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.serviceEstudiante.getById(this.idUser).then((datosEstudiante) => {
      return (this.estud = datosEstudiante);
    });
  }

  editarEstudiante(idDocument, idEstudiante, estud: Estudiante) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceEstudiante.updateEstudiante(idDocument, idEstudiante, estud);
    this.router.navigate([`admin/${this.idUser}/estudiantes/${this.idUser}`]);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '¡Editado Correctamente!',
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

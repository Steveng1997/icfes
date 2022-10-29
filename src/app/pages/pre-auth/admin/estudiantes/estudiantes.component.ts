import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/core/services/estudiantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  estudiantes: any[] = [];
  public page!: number;

  constructor(
    public router: Router,
    public serviceEstudiante: EstudianteService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  Agregar() {
    this.router.navigate(['admin/insertar-estudiantes']);
  }

  getEmpleados() {
    this.serviceEstudiante.getEstudiantes().then((datosEstudiantes) => {
      this.estudiantes = datosEstudiantes;
    });
  }

  DeleteUser(idDocumentReto, id) {
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

        this.serviceEstudiante.deleteEstudiante(idDocumentReto, id);
        this.getEmpleados();
      }
    });
  }
}

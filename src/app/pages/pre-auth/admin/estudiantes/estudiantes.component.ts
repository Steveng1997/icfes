import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/core/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {

  estudiantes: any[] = [];
  public page!: number;

  constructor(public router: Router, public serviceAreas: EstudianteService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  Agregar() {
    this.router.navigate(['admin/insertar-estudiantes']);
  }

  getEmpleados() {
    this.serviceAreas.getEstudiantes().subscribe((data) => {
      this.estudiantes = [];
      data.forEach((element: any) => {
        this.estudiantes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  DeleteUser(id: string) {
    const confirmation = confirm('Deseas eliminar el registro');
    if (confirmation) {
      this.serviceAreas.deleteUsuario(id);
    }
  }

  editUser(id: string) {
    this.router.navigate(['admin/editar-usuario/' + id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/core/services/estudiantes.service';

@Component({
  selector: 'app-insertar-estudiantes',
  templateUrl: './insertar-estudiantes.component.html',
  styleUrls: ['./insertar-estudiantes.component.scss']
})
export class InsertarEstudiantesComponent implements OnInit {

  public nombre: string = '';

  constructor(
    public router: Router,
    public serviceEstudiante: EstudianteService
  ) { }

  ngOnInit(): void {
  }

  addEstudiante() {
    this.serviceEstudiante.registerAreas(this.nombre).then((res) => {
      alert("Estudiante insertado")
      this.router.navigate(['admin/estudiantes'])
    }).catch(err => console.log('err', err.message));
  }
}
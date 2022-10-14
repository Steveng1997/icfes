import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudianteService } from 'src/app/core/services/estudiantes.service';

@Component({
  selector: 'app-reto-amigo',
  templateUrl: 'reto-amigo.component.html',
  styleUrls: ['reto-amigo.component.scss']
})
export class RetoAmigoComponent implements OnInit {

  estudiantes: any[] = [];

  opcionSeleccionado: string = '0';

  constructor(public router: Router,
    public serviceEstudiante: EstudianteService
  ) { }

  ngOnInit(): void {
    this.getEstudiante();
  }

  Retar() {
    if (this.opcionSeleccionado != '0') {
      this.router.navigate(['areas']);
    } else {
      alert("Selecciona a quien quieres retar");
    }
  }

  getEstudiante() {
    this.serviceEstudiante.getEstudiantes().subscribe(data => {
      this.estudiantes = [];
      data.forEach((element: any) => {
        this.estudiantes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }
}

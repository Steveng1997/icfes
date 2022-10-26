import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { EstudianteService } from '../../../../../core/services/estudiantes.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
//importamos el modelo
import { Estudiante } from 'src/app/core/models/estudiante';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.scss'],
})
export class EditarEstudianteComponent implements OnInit {
  estud: Estudiante[];

  constructor(
    public router: Router,
    public serviceEstudiante: EstudianteService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceEstudiante.getById(id).subscribe((res) => {
      this.estud = res;
    });
  }

  editarEstudiante(estud: Estudiante) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceEstudiante.updateEstudiante(estud);
    this.router.navigate(['admin/estudiantes']);
  }
}

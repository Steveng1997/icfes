import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
//importamos el modelo
import { Puntaje } from 'src/app/core/models/Puntaje';

@Component({
  selector: 'app-editar-puntuacion',
  templateUrl: './editar-puntuacion.component.html',
  styleUrls: ['./editar-puntuacion.component.scss'],
})
export class EditarPuntuacionComponent implements OnInit {
  puntu: Puntaje[];

  constructor(
    public router: Router,
    public servicePuntuacion: PuntuacionService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.servicePuntuacion.getById(id).subscribe((res) => {
      this.puntu = res;
    });
  }

  editarEstudiante(puntu: Puntaje) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.servicePuntuacion.updatePuntuacion(puntu);
    this.router.navigate(['admin/puntaje']);
  }
}

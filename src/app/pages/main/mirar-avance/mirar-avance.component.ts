import { Component, OnInit } from '@angular/core';
//importamos el servicio
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Puntaje } from 'src/app/core/models/Puntaje';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mirar-avance',
  templateUrl: 'mirar-avance.component.html',
  styleUrls: ['mirar-avance.component.scss'],
})
export class MirarAvanceComponent implements OnInit {
  puntajes: Puntaje[];
  idUser: string;
  constructor(
    public router: Router,
    public servicePuntaje: PuntuacionService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.servicePuntaje
      .getPuntajeByIdUsuario(this.idUser)
      .then((respuestaPuntaje) => {
        this.puntajes = respuestaPuntaje;
      });
  }

  salir() {
    this.router.navigate(['']);
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';
//importamos el servicio
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Puntaje } from 'src/app/core/models/Puntaje';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-mirar-avance',
  templateUrl: 'mirar-avance.component.html',
  styleUrls: ['mirar-avance.component.scss'],
})
export class MirarAvanceComponent implements OnInit {
  puntajes: Puntaje[];
  idUser: string;

  modalRef: BsModalRef;

  constructor(
    public router: Router,
    public servicePuntaje: PuntuacionService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.servicePuntaje
      .getPuntajeByIdUsuario(this.idUser)
      .then((respuestaPuntaje) => {
        this.puntajes = respuestaPuntaje;
      });
  }

  openModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  salir() {
    this.router.navigate(['']);
  }
}

import { Component, OnInit } from '@angular/core';
//Models
import { Usuario } from 'src/app/core/models/login';
//importamos el servicio
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
import { LoginService } from 'src/app/core/services/login.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Puntaje } from 'src/app/core/models/Puntaje';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-mirar-avance',
  templateUrl: 'mirar-avance.component.html',
  styleUrls: ['mirar-avance.component.scss'],
})
export class MirarAvanceComponent implements OnInit {
  puntajes: Puntaje[];
  idUser: string;
  public page!: number;
  usuarios: Usuario[];

  constructor(
    public router: Router,
    public servicePuntaje: PuntuacionService,
    public serviceLogin: LoginService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    public servicePuntuacion: PuntuacionService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser).then((resp => {
      this.usuarios = resp
    }));

    this.servicePuntaje
      .getPuntajeByIdUsuario(this.idUser)
      .then((respuestaPuntaje) => {
        this.puntajes = respuestaPuntaje;
      });
  }

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  salir() {
    this.router.navigate([`menu/${this.usuarios[0]['id']}`]);
  }
}

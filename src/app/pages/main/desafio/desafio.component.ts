import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Desafio } from 'src/app/core/models/desafio';
import { Usuario } from 'src/app/core/models/login';
import { DesafioService } from 'src/app/core/services/desafio.service';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-desafio',
  templateUrl: './desafio.component.html',
  styleUrls: ['./desafio.component.scss']
})
export class DesafioComponent implements OnInit {
  estudiantes: any[] = [];
  user: Usuario[];
  desafio: Desafio[];
  opcionSeleccionado: any = 0;
  idUser: string;

  onSelect(e) {
    this.opcionSeleccionado = e.target.value
  }

  constructor(
    public router: Router,
    public sercieDesafio: DesafioService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute,
    private serviceDesafio: DesafioService
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser).then((resp => {
      this.user = resp
    }));

    this.serviceDesafio.getDesafios().then((datosEstudiantes) => {
      this.desafio = datosEstudiantes;
    });
  }

  Retar() {
    if (this.opcionSeleccionado != 0) {
      this.router.navigate([`retoDesafio/${this.idUser}/${this.desafio[0]['idReto']}/${this.desafio[0]['categoria']}`]);
    } else {
      Swal.fire({
        icon: 'error',
        text: '¡Seleccion un reto pendiente!',
      })
    }
  }
}
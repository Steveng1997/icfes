import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-incorrecto-personal',
  templateUrl: './incorrecto-personal.component.html',
  styleUrls: ['./incorrecto-personal.component.scss'],
})
export class IncorrectoPersonalComponent implements OnInit {
  idUser: string;
  user: Usuario[];
  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private serviceLogin: LoginService) { }

  ngOnInit(): void {
    this.idUser = this.rutaActiva.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser).then((rp => {
      this.user = rp
    }));
  }

  salir() {
    this.router.navigate(['']);
  }

  volverAretar() {
    this.router.navigate([`menuArea-personal/${this.idUser}`]);
  }

  menuPrincipal() {
    this.router.navigate([`menu/${this.idUser}`]);
  }
}

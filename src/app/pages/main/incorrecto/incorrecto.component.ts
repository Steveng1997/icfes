import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.component.html',
  styleUrls: ['./incorrecto.component.scss'],
})
export class IncorrectoComponent implements OnInit {
  user: Usuario[];
  idUser: string;
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private serviceLogin: LoginService
  ) {}

  ngOnInit(): void {
    this.idUser = this.rutaActiva.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser).then((res) => {
      this.user = res;
    });
  }

  salir() {
    this.router.navigate(['login']);
  }

  volverAretar() {
    this.router.navigate([`ret-amigo/${this.user[0]['id']}`]);
  }

  menuPrincipal() {
    this.router.navigate([`menu/${this.user[0]['id']}`]);
  }
}

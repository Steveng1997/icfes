import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-correcto-personal',
  templateUrl: './correcto-personal.component.html',
  styleUrls: ['./correcto-personal.component.scss'],
})
export class CorrectoPersonalComponent implements OnInit {
  idUser: string;
  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private serviceLogin: LoginService
  ) { }

  ngOnInit(): void {
    this.idUser = this.rutaActiva.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
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

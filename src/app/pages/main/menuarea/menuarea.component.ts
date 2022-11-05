import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Desafio } from 'src/app/core/models/desafio';
import { Usuario } from 'src/app/core/models/login';
import { DesafioService } from 'src/app/core/services/desafio.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-menuarea',
  templateUrl: 'menuarea.component.html',
  styleUrls: ['menuarea.component.scss'],
})
export class MenuareaComponent implements OnInit {
  user: Usuario[];
  idUser: string;
  idDesafio: string;
  desafio: Desafio[];
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private serviceLogin: LoginService,
    private serviceDesafio: DesafioService
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('idUser');
    this.serviceLogin.getById(this.idUser).then((res) => {
      this.user = res;
    });

    this.idDesafio = this.activeRoute.snapshot.paramMap.get('idDesafio');
    this.serviceDesafio.getById(this.idDesafio).then((des) => {
      this.desafio = des;
    })
  }


  Matematica() {
    this.router.navigate([`retos/${this.idUser}/Matematicas/${this.idDesafio}`]);
  }

  Lenguaje() {
    this.router.navigate([`retos/${this.idUser}/Lenguaje/${this.idDesafio}`]);
  }

  CienciaSociales() {
    this.router.navigate([`retos/${this.idUser}/CienciaSociales/${this.idDesafio}`]);
  }

  CienciaNaturales() {
    this.router.navigate([`retos/${this.idUser}/CienciaNaturales/${this.idDesafio}`]);
  }

  salir() {
    this.router.navigate(['']);
  }
}

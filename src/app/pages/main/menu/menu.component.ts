import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public estudiante = null;
  user: Usuario[];
  idUser: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public serviceLogin: LoginService
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser).then((res) => {
      this.user = res;
    });
  }

  retoAmigo() {
    this.router.navigate([`ret-amigo/${this.user[0]['id']}`]);
  }

  retoPersonal() {
    this.router.navigate([`menuArea-personal/${this.user[0]['id']}`]);
  }

  mirarAvance() {
    this.router.navigate([`mirarAvance/${this.user[0]['id']}`]);
  }

  salir() {
    this.router.navigate(['login']);
  }
}

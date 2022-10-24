import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public estudiante = null;

  constructor(private router: Router, public serviceLogin: LoginService) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  retoAmigo() {
    this.router.navigate(['ret-amigo']);
  }

  retoPersonal() {
    this.router.navigate(['menuArea-personal']);
  }

  mirarAvance() {
    this.router.navigate(['mirarAvance']);
  }

  salir() {
    this.router.navigate(['login']);
  }

  // estaLogueado(){
  //   return this.serviceLogin.estaLogueado();
  // }

  // logout(){
  //   this.serviceLogin.logout();
  // }

  getLoggedUser() {
    this.estudiante = this.serviceLogin.rolAdministrador();
    console.log(this.estudiante);
  }
}

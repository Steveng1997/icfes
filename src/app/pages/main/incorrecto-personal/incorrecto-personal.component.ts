import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incorrecto-personal',
  templateUrl: './incorrecto-personal.component.html',
  styleUrls: ['./incorrecto-personal.component.scss'],
})
export class IncorrectoPersonalComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  salir() {
    this.router.navigate(['login']);
  }

  volverAretar() {
    this.router.navigate(['ret-amigo']);
  }

  menuPrincipal() {
    this.router.navigate(['menu']);
  }
}

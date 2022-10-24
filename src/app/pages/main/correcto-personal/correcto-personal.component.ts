import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correcto-personal',
  templateUrl: './correcto-personal.component.html',
  styleUrls: ['./correcto-personal.component.scss'],
})
export class CorrectoPersonalComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.component.html',
  styleUrls: ['./incorrecto.component.scss'],
})
export class IncorrectoComponent implements OnInit {
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

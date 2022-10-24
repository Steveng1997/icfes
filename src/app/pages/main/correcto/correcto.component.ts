import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.component.html',
  styleUrls: ['./correcto.component.scss'],
})
export class CorrectoComponent implements OnInit {
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

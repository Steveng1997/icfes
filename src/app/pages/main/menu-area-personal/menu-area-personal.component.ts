import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RetoService } from 'src/app/core/services/retos.service';

@Component({
  selector: 'app-menu-area-personal',
  templateUrl: './menu-area-personal.component.html',
  styleUrls: ['./menu-area-personal.component.scss'],
})
export class MenuAreaPersonalComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  salir() {
    this.router.navigate(['login']);
  }
}

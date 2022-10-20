import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  id: string;
  datoUsers: Usuario[];
  // @ViewChild('pregunta') pregunta: ElementRef;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private userService: LoginService
  ) {}

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.paramMap.get('id');
  }

  getUsuarios(categoria: string): void {
    this.userService
      .getUsuarioById(categoria)
      .then((dataCategoria) => {
        this.datoUsers = dataCategoria;
      })
      .catch((err) => console.log('err', err.message));
  }
}

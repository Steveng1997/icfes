import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { RetoService } from 'src/app/core/services/retos.service';

@Component({
  selector: 'app-reto-personal',
  templateUrl: './reto-personal.component.html',
  styleUrls: ['./reto-personal.component.scss'],
})
export class RetoPersonalComponent implements OnInit {
  retos: any[] = [];
  idUser: string;
  public page!: number;

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.getRetos();
  }

  Agregar() {
    this.router.navigate([
      `admin/${this.idUser}/insertar-retos/${this.idUser}`,
    ]);
  }

  getRetos() {
    this.serviceRetos.getRetoPersonalAll().subscribe((datosRetos) => {
      this.retos = datosRetos;
    });
  }
}

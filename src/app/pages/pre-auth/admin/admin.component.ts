import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { LoginService } from 'src/app/core/services/login.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  user: Usuario[];
  idUser: string;

  constructor(
    public router: Router,
    public serviceUser: LoginService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceUser.getById(this.idUser).then((rp => {
      this.user = rp;
    }))
  }

  usuarios(){
    this.router.navigate([`admin/${this.idUser}/usuarios`]);
  }

  retos(){
    this.router.navigate([`admin/${this.idUser}/adminRetos`]);
  }

  estudiantes(){
    this.router.navigate([`admin/${this.idUser}/estudiantes`]);
  }

  puntaje(){
    this.router.navigate([`admin/${this.idUser}/puntaje`]);
  }

  retoPersonal(){
    this.router.navigate([`admin/${this.idUser}/reto-personal`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-insertar-login',
  templateUrl: './insertar-login.html',
  styleUrls: ['./insertar-login.scss'],
})
export class InsertarUsuario implements OnInit {
  public email: string = '';
  public password: string = '';
  public nombre: string = '';

  opcionSeleccionado: string = '0';
  verSeleccion: string = '';

  constructor(public router: Router, public serviceLogin: LoginService) { }

  ngOnInit(): void { }

  onAddUser() {
    if (this.email != '' && this.password != '') {
      this.serviceLogin.emailExistAndPassword(this.email, this.password).then((emailexist) => {
        if (emailexist == false) {
          this.serviceLogin
            .registerUser(
              this.email,
              this.nombre,
              this.password,
              this.opcionSeleccionado
            )
            .catch((err) => console.log('err', err.message));
        } else {
          alert('El correo ya existe');
          console.log('existe correo');
        }
      });
    } else {
      alert('Campos vacios');
    }
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    console.log(this.verSeleccion);
  }
}

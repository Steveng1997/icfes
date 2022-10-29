import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

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

  constructor(public router: Router, public serviceLogin: LoginService) {}

  ngOnInit(): void {}

  onAddUser() {
    if (this.email != '') {
      if (this.nombre != '') {
        if (this.password != '') {
          if (this.verSeleccion != '' || this.opcionSeleccionado != '0') {
            this.serviceLogin.getByEmail(this.email).then((emailexist) => {
              if (emailexist.length != 0) {
                Swal.fire({
                  icon: 'error',
                  title: 'El usuario existe en la base de datos.',
                });
              } else {
                this.serviceLogin.registerUser(
                  this.email,
                  this.nombre,
                  this.password,
                  this.opcionSeleccionado
                );
                this.router.navigate(['admin/usuarios']);
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: '¡Insertado Correctamente!',
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'El campo seleccionado se encuentra vacío.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'El campo password se encuentra vacío.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'El campo nombre se encuentra vacío.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'El campo email se encuentra vacío.',
      });
    }
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
  }
}

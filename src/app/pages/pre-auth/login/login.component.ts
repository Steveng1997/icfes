import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  usuarios: Usuario[];

  constructor(public router: Router, public serviceLogin: LoginService) { }

  ngOnInit(): void { }

  onLogin(): void {
    if (this.email != '') {
      if (this.password != '') {
        this.serviceLogin
          .emailExistAndPassword(this.email, this.password)
          .then((dataCategoria) => {
            this.usuarios = dataCategoria;
            if (this.usuarios[0]['rol'] == 'administrador') {
              this.router.navigate(['admin/usuarios']);
            } else {
              this.router.navigate([`menu/${this.usuarios[0]['id']}`]);
            }
          })
          .catch(() => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo o la contraseña esta incorrecta',
          }));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El campo de la contraseña se encuentra vacío',
        });
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo del correo se encuentra vacío',
      });
    }

  }
}

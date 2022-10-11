import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-insertar-login',
  templateUrl: './insertar-login.html',
  styleUrls: ['./insertar-login.scss']
})
export class InsertarUsuario implements OnInit {

  public email: string = '';
  public password: string = '';

  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  constructor(
    public router: Router,
    public serviceLogin: LoginService
  ) { }

  ngOnInit(): void {
  }
  
  onAddUser() {
    this.serviceLogin.emailExist(this.email)
      .then((emailexist) => {
        if (emailexist == false) {
          this.serviceLogin.registerUser(this.email, this.password, this.opcionSeleccionado).then((res) => {
            this.serviceLogin.isAuth().subscribe(user => {
              if (user) {
                user.updateProfile({
                  displayName: ''
                  // photoURL: this.inputImageUser.nativeElement.value
                }).then(() => {
                  alert('Registro completo');
                  this.router.navigate(['admin/usuarios']);
                }).catch((error) => alert('error' + error));
              }

            });
          }).catch(err => console.log('err', err.message));
        } else {
          // console.log(emailexist)
          alert("El correo ya existe");
          console.log("existe correo")
          // return
        }
      });
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    console.log(this.verSeleccion)
}
}
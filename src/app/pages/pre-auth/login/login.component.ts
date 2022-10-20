import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public userUid: string = null;

  constructor(public router: Router, public serviceLogin: LoginService) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.serviceLogin.emailExist(this.email).then((emailexist) => {
      if (emailexist) {
        this.serviceLogin
          .rolAdministradorByEmail(this.email)
          .then((userAdmin) => {
            if (userAdmin) {
              this.serviceLogin
                .loginEmailUser(this.email, this.password)
                .then((res) => {
                  // this.onLoginRedirect();
                  this.router.navigate(['admin/usuarios']);
                })
                .catch((err) => console.log('err', err.message));
            } else {
              this.router.navigate(['menu']);
            }
          });
      } else {
        alert('Usuario no registrado');
      }
    });
  }

  onLogout() {
    this.serviceLogin.logoutUser();
  }
}

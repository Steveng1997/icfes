import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/core/services/login.service'


@Component({
  selector: 'app-mirar-avance',
  templateUrl: 'mirar-avance.component.html',
  styleUrls: ['mirar-avance.component.scss']
})
export class MirarAvanceComponent implements OnInit {
  public estudiante = null;

  constructor(private router: Router, public serviceLogin: LoginService) {
  }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  salir() {
    this.router.navigate(['login'])
  }


  getLoggedUser() {
    this.estudiante = this.serviceLogin.rolAdministrador();
    console.log(this.estudiante)
  }
}

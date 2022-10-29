import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-menuarea',
  templateUrl: 'menuarea.component.html',
  styleUrls: ['menuarea.component.scss'],
})
export class MenuareaComponent implements OnInit {
  user: Usuario[];
  idUser: string;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private serviceLogin: LoginService
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser).then((res) => {
      this.user = res;
    });
  }

  salir() {
    this.router.navigate(['']);
  }
}

import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { LoginService } from '../services/login.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user: Usuario[];
  constructor(
    public router: Router,
    public serviceUser: LoginService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const email = this.activeRoute.snapshot.paramMap.get('email');
    this.serviceUser.getByName(email).subscribe((res) => {      
      this.user = res;
    });
  }
}

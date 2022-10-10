import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent implements OnInit {

  constructor(public router: Router,
    public serviceLogin: LoginService
    ) { }

  ngOnInit(): void {
  }

  }

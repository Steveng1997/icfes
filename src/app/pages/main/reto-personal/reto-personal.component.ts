import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { Retos } from 'src/app/core/models/retos';
import { LoginService } from 'src/app/core/services/login.service';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
import { RetoService } from 'src/app/core/services/retos.service';

@Component({
  selector: 'app-reto-personal',
  templateUrl: './reto-personal.component.html',
  styleUrls: ['./reto-personal.component.scss'],
})
export class RetoPersonalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { DesafioService } from 'src/app/core/services/desafio.service';
import { EstudianteService } from 'src/app/core/services/estudiantes.service';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reto-amigo',
  templateUrl: 'reto-amigo.component.html',
  styleUrls: ['reto-amigo.component.scss'],
})
export class RetoAmigoComponent implements OnInit {
  estudiantes: any[] = [];
  user: Usuario[];
  opcionSeleccionado: any;
  idUser: string;

  onSelect(e) {
    this.opcionSeleccionado = e.target.value
  }

  constructor(
    public router: Router,
    public serviceEstudiante: EstudianteService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute,
    private serviceDesafio: DesafioService
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.getEstudiante();
  }

  Retar() {
    if (this.opcionSeleccionado) {
      this.serviceDesafio.registerDesafio(this.opcionSeleccionado)
      this.router.navigate([`areas/${this.idUser}`]);
    } else {
      Swal.fire(
        '',
        'Selecciona a quien quieres retar',
        'question'
      )
    }


  }

  getEstudiante() {
    this.serviceEstudiante.getEstudiantes().then((datosEstudiantes) => {
      return (this.estudiantes = datosEstudiantes);
    });
  }
}

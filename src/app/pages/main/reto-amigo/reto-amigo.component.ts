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
  opcionSeleccionado: any = 0;
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
      this.serviceDesafio.registerDesafio(this.opcionSeleccionado).then((rp => {
        if (rp.id) {
          this.router.navigate([`areas/${this.idUser}/${rp.id}`]);
        }
      }))

    } else {
      Swal.fire({
        icon: 'error',
        text: '¡Seleccione a quien quieres retar!',
      })
    }
  }

  getEstudiante() {
    this.serviceEstudiante.getEstudiantes().then((datosEstudiantes) => {
      return (this.estudiantes = datosEstudiantes);
    });
  }
}

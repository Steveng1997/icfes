import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { EstudianteService } from 'src/app/core/services/estudiantes.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-reto-amigo',
  templateUrl: 'reto-amigo.component.html',
  styleUrls: ['reto-amigo.component.scss']
})
export class RetoAmigoComponent implements OnInit {
  estudiantes: any[] = [];
  user: Usuario[];
  opcionSeleccionado: string = '0';

  constructor(public router: Router,
    public serviceEstudiante: EstudianteService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(id).subscribe((res) => {
      this.user = res;
      this.getEstudiante();
    });
  }

  Retar() {
    if (this.opcionSeleccionado != '0') {
      this.router.navigate([`areas/${this.user[0]['id']}`]);
    } else {
      alert("Selecciona a quien quieres retar");
    }
  }

  getEstudiante() {
    this.serviceEstudiante.getEstudiantes().subscribe(data => {
      this.estudiantes = [];
      data.forEach((element: any) => {
        this.estudiantes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Retos } from 'src/app/core/models/retos';
import { RetoService } from 'src/app/core/services/retos.service';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Usuario } from 'src/app/core/models/login';

@Component({
  selector: 'app-reto-personal',
  templateUrl: './reto-personal.component.html',
  styleUrls: ['./reto-personal.component.scss'],
})
export class RetoPersonalComponent implements OnInit {
  categoria: string;
  datosReto: Retos[];
  user: Usuario[];

  public page!: number;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private retoService: RetoService,
    private serviceLogin: LoginService,
    private servicePuntaje: PuntuacionService
  ) { }

  ngOnInit() {
    const id = this.rutaActiva.snapshot.paramMap.get('id');
    this.serviceLogin.getById(id).subscribe((res) => {
      this.user = res;
    });
    this.categoria = this.rutaActiva.snapshot.paramMap.get('categoria');
    this.getByCategoria(this.categoria);
  }

  getByCategoria(categoria: string): void {
    this.retoService
      .getByCategoria(categoria)
      .then((dataCategoria) => {
        this.datosReto = dataCategoria;
        setTimeout(() => {
          this.convertToHtml();
        }, 1000);
      })
      .catch((err) => console.log('err', err.message));
  }

  convertToHtml() {
    var texto1 = document.querySelectorAll("[id='texto1']");

    for (let i = 0; i < this.datosReto.length; i++) {
      this.datosReto[i]['texto1'] = this.datosReto[i]['texto1'].replace(
        /\n/g,
        '<br/>'
      );
      for (let j = 0; j < texto1.length; j++) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(
          this.datosReto[j]['texto1'],
          'text/html'
        );
        texto1[j]['innerHTML'] = doc.body.innerHTML;
      }
    }
  }

  opcionA(event) {
    let puntaje: Number;

    if (this.datosReto[0]['respuesta'] == event.target.innerHTML.trim()) {
      puntaje = 2;
    } else {
      puntaje = 1;
    }

    this.servicePuntaje
      .getPuntajeByIdUsuario(this.user[0]['id'])
      .subscribe((respu) => {
        if (respu) {
          let puntajeActual = respu[0]['puntuacion'] + puntaje;

          // this.servicePuntaje.updatePuntaje(this.user[0]['id'], puntajeActual);
        } else {
          // crea
          this.servicePuntaje.registerByIdUsuario(this.user[0]['id']);
        }

        if (puntaje == 2) {
          this.router.navigate([`correcto/${this.user[0]['id']}`]);
        }

        if (puntaje == 1) {
          this.router.navigate([`incorrecto/${this.user[0]['id']}`]);
        }
      });
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { Retos } from 'src/app/core/models/retos';
import { LoginService } from 'src/app/core/services/login.service';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
import { RetoService } from 'src/app/core/services/retos.service';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.scss'],
})
export class RetosComponent implements OnInit {
  categoria: string;
  datosReto: Retos[];
  user: Usuario[];
  idUser: string;
  public page!: number;

  puntajeObtenido: any = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private retoService: RetoService,
    private serviceLogin: LoginService,
    private servicePuntaje: PuntuacionService
  ) { }

  ngOnInit() {
    this.idUser = this.rutaActiva.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);

    this.categoria = this.rutaActiva.snapshot.paramMap.get('categoria');
    this.getByCategoria(this.categoria);
  }

  getByCategoria(categoria: string): void {
    this.retoService
      .getByCategoria(categoria)
      .then((dataCategoria) => {

        this.datosReto = dataCategoria.filter(_reto => {
          if (_reto['idsUsuarios'].includes(this.idUser)) {
            return
          }
          return _reto
        })

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

  obtenerPuntaje(idUser) {
    console.log(idUser);

    this.servicePuntaje
      .getPuntajeByIdUsuario(idUser)
      .subscribe((respu) => {
        this.puntajeObtenido = respu[0]
        return this.puntajeObtenido
      });
  }

  opcionA(event, idDocumentReto, idReto, idsUsuarios, respuesta) {
    this.obtenerPuntaje(this.idUser)

    if (!idsUsuarios) {
      idsUsuarios = []
    }

    idsUsuarios.push(this.idUser)
    this.retoService.updateIdsUsuarios(idDocumentReto, idReto, idsUsuarios).then(resp => {
      setTimeout(() => {
        let puntaje: Number;
        if (this.puntajeObtenido) {

          if (respuesta == event.target.innerHTML.trim()) {
            puntaje = 2;
          } else {
            puntaje = 1;
          }

          this.servicePuntaje.updatePuntaje(this.puntajeObtenido['idDocument'], this.idUser, this.puntajeObtenido['puntuacion'] + puntaje).then(rp => {
            console.log(rp);
          })
        }
        else {
          // crea
          this.servicePuntaje.registerByIdUsuario(this.idUser);
        }

        if (puntaje == 2) {
          this.router.navigate([`correcto/${this.idUser}`]);
        }

        if (puntaje == 1) {
          this.router.navigate([`incorrecto/${this.idUser}`]);
        }

      }, 1000);
    });
  }
}

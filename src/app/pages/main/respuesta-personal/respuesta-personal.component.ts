import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { RetoPersonalService } from 'src/app/core/services/retoPersonal.service';
import { RetoPesonal } from 'src/app/core/models/retoPersonal';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
import { Usuario } from 'src/app/core/models/login';

@Component({
  selector: 'app-respuesta-personal',
  templateUrl: './respuesta-personal.component.html',
  styleUrls: ['./respuesta-personal.component.scss'],
})
export class RespuestaPersonalComponent implements OnInit {
  categoria: string;
  datosReto: RetoPesonal[];
  user: Usuario[];
  idUser: string;
  public page!: number;

  puntajeObtenido: any = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private retoService: RetoPersonalService,
    private serviceLogin: LoginService,
    private servicePuntaje: PuntuacionService
  ) { }

  ngOnInit() {
    this.idUser = this.rutaActiva.snapshot.paramMap.get('id');
    this.retoService.getById(this.idUser).then((datoRet) => {
      this.datosReto = datoRet;
    });

    this.categoria = this.rutaActiva.snapshot.paramMap.get('categoria');
    this.getByCategoria(this.idUser, this.categoria);
  }

  getByCategoria(id, categoria): void {
    this.retoService
      .getByCategoria(id, categoria)
      .then((dataCategoria) => {
        this.datosReto = dataCategoria.filter((_reto) => {
          if (_reto['idsUsuarios'].includes(this.idUser)) {
            return;
          }
          return _reto;
        });

        setTimeout(() => {
          this.convertToHtml();
          this.convertToHtml2();
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

  convertToHtml2() {
    var texto2 = document.querySelectorAll("[id='texto2']");

    for (let i = 0; i < this.datosReto.length; i++) {
      this.datosReto[i]['texto2'] = this.datosReto[i]['texto2'].replace(
        /\n/g,
        '<br/>'
      );
      for (let j = 0; j < texto2.length; j++) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(
          this.datosReto[j]['texto2'],
          'text/html'
        );
        texto2[j]['innerHTML'] = doc.body.innerHTML;
      }
    }
  }

  obtenerPuntaje(idUser) {
    this.servicePuntaje.getPuntajeByIdUsuario(idUser).then((respu) => {
      this.puntajeObtenido = respu[0];
      return this.puntajeObtenido;
    });
  }

  opcionImage(event, idDocumentReto, idReto, idsUsuarios, urlImgResp) {
    this.obtenerPuntaje(this.idUser);

    if (!idsUsuarios) {
      idsUsuarios = [];
    }

    idsUsuarios.push(this.idUser);
    this.retoService
      .updateIdsUsuarios(idDocumentReto, idReto, idsUsuarios)
      .then((resp) => {
        setTimeout(() => {
          let puntaje: Number;
          if (this.puntajeObtenido) {
            if (urlImgResp == event.target.src) {
              puntaje = 3;
            } else {
              puntaje = 1;
            }

            if (this.categoria == 'Lenguaje') {
              this.servicePuntaje
                .updatePuntajeLenguaje(
                  this.puntajeObtenido['idDocument'],
                  this.idUser,
                  this.puntajeObtenido['puntuacionLenguaje'] + puntaje
                )
                .then((rp) => {
                  console.log(rp);
                });
            }

            if (this.categoria == 'Matematicas') {
              this.servicePuntaje
                .updatePuntajeMatematicas(
                  this.puntajeObtenido['idDocument'],
                  this.idUser,
                  this.puntajeObtenido['puntuacionMatematicas'] + puntaje
                )
                .then((rp) => {
                  console.log(rp);
                });
            }

            if (this.categoria == 'CienciaSociales') {
              this.servicePuntaje
                .updatePuntajeSociales(
                  this.puntajeObtenido['idDocument'],
                  this.idUser,
                  this.puntajeObtenido['puntuacionSociales'] + puntaje
                )
                .then((rp) => {
                  console.log(rp);
                });
            }

            if (this.categoria == 'CienciaNaturales') {
              this.servicePuntaje
                .updatePuntajeNaturales(
                  this.puntajeObtenido['idDocument'],
                  this.idUser,
                  this.puntajeObtenido['puntuacionNaturales'] + puntaje
                )
                .then((rp) => {
                  console.log(rp);
                });
            }

            this.servicePuntaje.updatePuntajeTotal(
              this.puntajeObtenido['idDocument'],
              this.idUser,
              this.puntajeObtenido['puntuacionLenguaje'] +
              this.puntajeObtenido['puntuacionMatematicas'] +
              this.puntajeObtenido['puntuacionSociales'] +
              this.puntajeObtenido['puntuacionNaturales'] +
              puntaje
            );
          } else {
            if (urlImgResp == event.target.src) {
              puntaje = 3;
            } else {
              puntaje = 1;
            }

            this.serviceLogin.getById(this.idUser).then((rp) => {
              if (this.categoria == 'Lenguaje') {
                this.servicePuntaje.registerByIdUsuarioLenguaje(
                  this.idUser,
                  puntaje,
                  rp[0]['nombre']
                );
              }

              if (this.categoria == 'Matematicas') {
                this.servicePuntaje.registerByIdUsuarioMatematicas(
                  this.idUser,
                  puntaje,
                  rp[0]['nombre']
                );
              }

              if (this.categoria == 'CienciaSociales') {
                this.servicePuntaje.registerByIdUsuarioSociales(
                  this.idUser,
                  puntaje,
                  rp[0]['nombre']
                );
              }

              if (this.categoria == 'CienciaNaturales') {
                this.servicePuntaje.registerByIdUsuarioNaturales(
                  this.idUser,
                  puntaje,
                  rp[0]['nombre']
                );
              }
            });
          }

          if (puntaje == 3) {
            this.router.navigate([`correctoPersonal/${this.idUser}`]);
          }

          if (puntaje == 1) {
            this.router.navigate([`incorrectoPersonal/${this.idUser}`]);
          }
        }, 1000);
      });
  }

  opcionA(event, idDocumentReto, idReto, idsUsuarios, respuesta) {
    this.obtenerPuntaje(this.idUser);

    if (!idsUsuarios) {
      idsUsuarios = [];
    }

    idsUsuarios.push(this.idUser);
    this.retoService
      .updateIdsUsuarios(idDocumentReto, idReto, idsUsuarios)
      .then((resp) => {
        setTimeout(() => {
          let puntaje: Number;
          if (this.puntajeObtenido) {
            if (respuesta == event.target.innerHTML.trim()) {
              puntaje = 3;
            } else {
              puntaje = 1;
            }

            if (this.categoria == 'Lenguaje') {
              this.servicePuntaje
                .updatePuntajeLenguaje(
                  this.puntajeObtenido['idDocument'],
                  this.idUser,
                  this.puntajeObtenido['puntuacionLenguaje'] + puntaje
                )
                .then((rp) => {
                  console.log(rp);
                });
            }

            if (this.categoria == 'Matematicas') {
              this.servicePuntaje
                .updatePuntajeMatematicas(
                  this.puntajeObtenido['idDocument'],
                  this.idUser,
                  this.puntajeObtenido['puntuacionMatematicas'] + puntaje
                )
                .then((rp) => {
                  console.log(rp);
                });
            }

            if (this.categoria == 'CienciaSociales') {
              this.servicePuntaje
                .updatePuntajeSociales(
                  this.puntajeObtenido['idDocument'],
                  this.idUser,
                  this.puntajeObtenido['puntuacionSociales'] + puntaje
                )
                .then((rp) => {
                  console.log(rp);
                });
            }

            if (this.categoria == 'CienciaNaturales') {
              this.servicePuntaje
                .updatePuntajeNaturales(
                  this.puntajeObtenido['idDocument'],
                  this.idUser,
                  this.puntajeObtenido['puntuacionNaturales'] + puntaje
                )
                .then((rp) => {
                  console.log(rp);
                });
            }

            this.servicePuntaje.updatePuntajeTotal(
              this.puntajeObtenido['idDocument'],
              this.idUser,
              this.puntajeObtenido['puntuacionLenguaje'] +
              this.puntajeObtenido['puntuacionMatematicas'] +
              this.puntajeObtenido['puntuacionSociales'] +
              this.puntajeObtenido['puntuacionNaturales'] +
              puntaje
            );

          } else {
            if (respuesta == event.target.innerHTML.trim()) {
              puntaje = 3;
            } else {
              puntaje = 1;
            }

            this.serviceLogin.getById(this.idUser).then((rp) => {
              if (this.categoria == 'Lenguaje') {
                this.servicePuntaje.registerByIdUsuarioLenguaje(
                  this.idUser,
                  puntaje,
                  rp[0]['nombre']
                );
              }

              if (this.categoria == 'Matematicas') {
                this.servicePuntaje.registerByIdUsuarioMatematicas(
                  this.idUser,
                  puntaje,
                  rp[0]['nombre']
                );
              }

              if (this.categoria == 'CienciaSociales') {
                this.servicePuntaje.registerByIdUsuarioSociales(
                  this.idUser,
                  puntaje,
                  rp[0]['nombre']
                );
              }

              if (this.categoria == 'CienciaNaturales') {
                this.servicePuntaje.registerByIdUsuarioNaturales(
                  this.idUser,
                  puntaje,
                  rp[0]['nombre']
                );
              }
            });
          }

          if (puntaje == 3) {
            this.router.navigate([`correctoPersonal/${this.idUser}`]);
          }

          if (puntaje == 1) {
            this.router.navigate([`incorrectoPersonal/${this.idUser}`]);
          }
        }, 1000);
      });
  }
}

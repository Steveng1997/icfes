import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desafio } from 'src/app/core/models/desafio';
import { Usuario } from 'src/app/core/models/login';
import { Retos } from 'src/app/core/models/retos';
import { LoginService } from 'src/app/core/services/login.service';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
import { RetoService } from 'src/app/core/services/retos.service';

@Component({
  selector: 'app-reto-personals',
  templateUrl: './reto-personals.component.html',
  styleUrls: ['./reto-personals.component.scss'],
})
export class RetoPersonalsComponent implements OnInit {
  categoria: string;
  datosReto: Retos[];
  user: Usuario[];
  idUser: string;
  idDesafio: string;
  desafio: Desafio[];
  public page!: number;

  puntajeObtenido: any = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private retoService: RetoService,
    private serviceLogin: LoginService,
    private servicePuntaje: PuntuacionService
  ) {}

  ngOnInit() {
    this.idUser = this.rutaActiva.snapshot.paramMap.get('idUser');
    this.serviceLogin.getById(this.idUser).then((rp) => {
      this.user = rp;
    });

    this.categoria = this.rutaActiva.snapshot.paramMap.get('categoria');
    this.getByCategoria(this.categoria);
  }

  getByCategoria(categoria: string): void {
    this.retoService
      .getByCategoria(categoria)
      .then((dataCategoria) => {
        this.datosReto = dataCategoria.filter((_reto) => {
          if (_reto['idsRetoPersonal'].includes(this.idUser)) {
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
    this.retoService.registerRetoPersonal(idReto, this.idUser, this.categoria);

    this.obtenerPuntaje(this.idUser);

    if (!idsUsuarios) {
      idsUsuarios = [];
    }

    idsUsuarios.push(this.idUser);
    this.retoService
      .updateIdsRetoPersonal(idDocumentReto, idReto, idsUsuarios)
      .then((resp) => {
        setTimeout(() => {
          let puntaje: Number;
          if (this.puntajeObtenido) {
            if (urlImgResp == event.target.src) {
              puntaje = 2;
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

            this.servicePuntaje
              .getPuntajeByIdUsuario(this.idUser)
              .then((resp) => {
                if (resp) {
                  this.servicePuntaje.updatePuntajeTotal(
                    resp[0]['idDocument'],
                    this.idUser,
                    this.puntajeObtenido['puntuacionLenguaje'] +
                      this.puntajeObtenido['puntuacionMatematicas'] +
                      this.puntajeObtenido['puntuacionSociales'] +
                      this.puntajeObtenido['puntuacionNaturales'] +
                      puntaje
                  );
                }
              });
          } else {
            if (urlImgResp == event.target.src) {
              puntaje = 2;
            } else {
              puntaje = 1;
            }

            this.serviceLogin.getByIdAll(this.idUser).subscribe((rp) => {
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

          if (puntaje == 2) {
            this.router.navigate([`correctoPersonal/${this.idUser}`]);
          }

          if (puntaje == 1) {
            this.router.navigate([`incorrectoPersonal/${this.idUser}`]);
          }
        }, 1000);
      });
  }

  opcionA(event, idDocumentReto, idReto, idsUsuarios, respuesta) {
    this.retoService.registerRetoPersonal(idReto, this.idUser, this.categoria);

    this.obtenerPuntaje(this.idUser);

    if (!idsUsuarios) {
      idsUsuarios = [];
    }

    idsUsuarios.push(this.idUser);
    this.retoService
      .updateIdsRetoPersonal(idDocumentReto, idReto, idsUsuarios)
      .then((resp) => {
        setTimeout(() => {
          let puntaje: Number;
          if (this.puntajeObtenido) {
            if (respuesta == event.target.innerHTML.trim()) {
              puntaje = 2;
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

            this.servicePuntaje.getById(this.idUser).then((rp) => {
              this.servicePuntaje.updatePuntajeTotal(
                this.puntajeObtenido['idDocument'],
                this.idUser,
                this.puntajeObtenido['puntuacionLenguaje'] +
                  this.puntajeObtenido['puntuacionMatematicas'] +
                  this.puntajeObtenido['puntuacionSociales'] +
                  this.puntajeObtenido['puntuacionNaturales'] +
                  puntaje
              );
            });
          } else {
            if (respuesta == event.target.innerHTML.trim()) {
              puntaje = 2;
            } else {
              puntaje = 1;
            }

            if (this.categoria == 'Lenguaje') {
              this.servicePuntaje.registerByIdUsuarioLenguaje(
                this.idUser,
                puntaje,
                this.user[0]['nombre']
              );
            }

            if (this.categoria == 'Matematicas') {
              this.servicePuntaje.registerByIdUsuarioMatematicas(
                this.idUser,
                puntaje,
                this.user[0]['nombre']
              );
            }

            if (this.categoria == 'CienciaSociales') {
              this.servicePuntaje.registerByIdUsuarioSociales(
                this.idUser,
                puntaje,
                this.user[0]['nombre']
              );
            }

            if (this.categoria == 'CienciaNaturales') {
              this.servicePuntaje.registerByIdUsuarioNaturales(
                this.idUser,
                puntaje,
                this.user[0]['nombre']
              );
            }
          }

          if (puntaje == 2) {
            this.router.navigate([`correctoPersonal/${this.idUser}`]);
          }

          if (puntaje == 1) {
            this.router.navigate([`incorrectoPersonal/${this.idUser}`]);
          }
        }, 1000);
      });
  }
}

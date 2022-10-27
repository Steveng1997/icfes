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

  @ViewChild('pregunta') pregunta: ElementRef;

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
          this.datosReto[i]['texto1'],
          'text/html'
        );
        texto1[j]['innerHTML'] = doc.body.innerHTML;
      }
    }
  }

  opcionA(event) {
    if (this.datosReto[0]['respuesta'] == event.target.innerHTML.trim()) {
      // Actualiza colocando correcto en 1 si la respuesta es igual a la opcion      
      this.retoService.updateOpcionesCorrecto(this.datosReto[0]['id']);
      // Consulta cuantas correctas existen
      this.retoService.getByCorrecto().subscribe((resaa) => {
        this.datosReto = resaa

        this.servicePuntaje.getByIdUsuario(this.user[0]['id']).subscribe(() => {
          if (this.user[0]['id'] != '') {
            this.servicePuntaje.updatePuntaje(this.user[0]['id'], resaa);
            this.router.navigate([`correcto/${this.user[0]['id']}`]);
          } else {
            this.servicePuntaje.registerByIdUsuario(this.user[0]['id']);
            this.router.navigate([`correcto/${this.user[0]['id']}`]);
          }
        });
      });
     

    } else {
      this.retoService.updateOpcionesIncorrecto(this.datosReto[0]['id']);
      this.servicePuntaje.getByIdUsuario(this.user[0]['id']).subscribe((res) => {
        if (res.length > 0) {
          this.router.navigate([`incorrecto/${this.user[0]['id']}`]);
        } else {
          this.servicePuntaje.registerByIdUsuarioAll(this.datosReto[0]['id']);
          this.router.navigate([`incorrecto/${this.user[0]['id']}`]);
        }
      });
    }
  }
}
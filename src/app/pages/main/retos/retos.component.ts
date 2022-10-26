import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Retos } from 'src/app/core/models/retos';
import { RetoService } from 'src/app/core/services/retos.service';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.scss'],
})
export class RetosComponent implements OnInit {
  categoria: string;
  datosReto: Retos[];

  @ViewChild('pregunta') pregunta: ElementRef;

  public page!: number;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private retoService: RetoService
  ) {}

  ngOnInit() {
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
      this.retoService.updateOpcionesCorrecto(this.datosReto[0]['id']);
      this.router.navigate(['correcto']);
    } else {
      this.retoService.updateOpcionesIncorrecto(this.datosReto[0]['id']);
      this.router.navigate(['incorrecto']);
    }
  }
}

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
        // this.convertToHtml();

        this.datosReto = this.datosReto;
        console.log(this.datosReto);
      })
      .catch((err) => console.log('err', err.message));
  }

  convertToHtml(str) {
    return document.getElementById('pregunta').innerHTML + 'Holis';

    for (let index = 0; index < this.datosReto.length; index++) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(
        this.datosReto[index]['pregunta'],
        'text/html'
      );
      // document.getElementById('pregunta' + index).innerHTML =
      //   doc.body.innerHTML;
      // console.log(document.getElementById('pregunta' + index));
      // console.log('pregunta' + index);
    }

    // let parser = new DOMParser();
    // let doc = parser.parseFromString(str, 'text/html');
    // console.log(doc.body.innerHTML);
    // document.getElementById('pregunta').innerHTML = doc.body.innerHTML;
    // return doc.body.innerHTML;
  }

  opcionA(event) {
    this.router.navigate(['areas']);
  }
}

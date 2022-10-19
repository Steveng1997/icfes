import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opciones } from 'src/app/core/models/opciones';
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
  datosOpciones: Opciones[];

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private retoService: RetoService
  ) {}

  ngOnInit() {
    this.categoria = this.rutaActiva.snapshot.paramMap.get('categoria');
    this.getByCategoria(this.categoria);
    this.getByOpciones(this.categoria);
  }

  getByCategoria(categoria: string): void {
    this.retoService
      .getByCategoria(categoria)
      .then((dataCategoria) => {
        this.datosReto = dataCategoria;
      })
      .catch((err) => console.log('err', err.message));
  }

  getByOpciones(categoria: string): void {
    this.retoService.getByOpciones(categoria).subscribe((data) => {
      console.log(data);
      this.datosOpciones = [data];
    });
  }
  // convertToHtml(str) {
  //   var parser = new DOMParser();
  //   var doc = parser.parseFromString(str, 'text/html');
  //   var allText = doc.body.outerHTML;
  //   document.getElementById('pregunta').innerHTML = allText;
  // }
}

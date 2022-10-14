import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Retos } from 'src/app/core/models/retos';
import { RetoService } from 'src/app/core/services/retos.service';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.component.html',
  styleUrls: ['./retos.component.scss']
})
export class RetosComponent implements OnInit {
  
  categoria: string;
  datosReto: Retos[];

  constructor(private rutaActiva: ActivatedRoute,
    private router: Router,
    private retoService: RetoService) {
  }

  retos: Retos[];

  ngOnInit() {
    this.categoria = this.rutaActiva.snapshot.paramMap.get('categoria');
    this.getByCategoria(this.categoria);
  }

  getByCategoria(categoria: string): void {
    this.retoService.getByCategoria(categoria)
      .then((dataCategoria) => {
        this.datosReto = dataCategoria ;
      }).catch(err => console.log('err', err.message));

      this.retoService.getByOpciones();
  }

  convertToHtml(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    var allText = doc.body.outerHTML;
    document.getElementById('pregunta').innerHTML = allText;
  }
}
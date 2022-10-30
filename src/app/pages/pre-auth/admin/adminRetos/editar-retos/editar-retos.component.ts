import { Component, OnInit } from '@angular/core';
//importamos el servicio
import { RetoService } from 'src/app/core/services/retos.service';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Retos } from 'src/app/core/models/retos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-retos',
  templateUrl: './editar-retos.component.html',
  styleUrls: ['./editar-retos.component.scss'],
})
export class EditarRetosComponent implements OnInit {
  urlImage: Observable<string>;
  selectedImage: any = null;
  imgSrc: string;
  reto: Retos[];
  idUser: string;

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetos.getById(this.idUser).then((datoRetos) => {
      return (this.reto = datoRetos);
    });
  }

  editarReto(idDocument, idReto, reto: Retos) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetos.updateRetos(idDocument, idReto, reto);
    this.router.navigate(['admin/adminRetos']);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '¡Editado correctamente!',
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

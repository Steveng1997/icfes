import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetoPersonalService } from 'src/app/core/services/retoPersonal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reto-personal',
  templateUrl: './reto-personal.component.html',
  styleUrls: ['./reto-personal.component.scss'],
})
export class RetoPersonalComponent implements OnInit {
  retos: any[] = [];
  public page!: number;

  constructor(
    public router: Router,
    public serviceRetoPersonal: RetoPersonalService
  ) {}

  ngOnInit(): void {
    this.getRetos();
  }

  getRetos() {
    this.serviceRetoPersonal.getRetosByCategoria().then((datosRetos) => {
      return (this.retos = datosRetos);
    });
  }

  DeleteRet(idDocumentReto, id) {
    Swal.fire({
      title: '¿Deseas eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Deseo eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Eliminado Correctamente!',
          showConfirmButton: false,
          timer: 2500,
        });

        this.serviceRetoPersonal.deleteRetos(idDocumentReto, id);
        this.getRetos();
      }
    });
  }
}

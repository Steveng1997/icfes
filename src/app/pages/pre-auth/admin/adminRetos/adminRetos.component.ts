import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetoService } from 'src/app/core/services/retos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminRetos',
  templateUrl: './adminRetos.component.html',
  styleUrls: ['./adminRetos.component.scss'],
})
export class AdminRetosComponent implements OnInit {
  retos: any[] = [];
  public page!: number;

  constructor(public router: Router, public serviceRetos: RetoService) { }

  ngOnInit(): void {
    this.getRetos();
  }

  Agregar() {
    this.router.navigate(['admin/insertar-retos']);
  }

  getRetos() {
    this.serviceRetos.getRetosByCategoria().then((datosRetos) => {
      setTimeout(() => {
        this.retos = datosRetos;
      }, 1000);
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

        this.serviceRetos.deleteRetos(idDocumentReto, id);
        this.getRetos();
      }
    });
  }
}

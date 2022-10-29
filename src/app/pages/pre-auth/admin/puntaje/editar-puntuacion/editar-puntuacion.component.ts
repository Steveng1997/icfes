import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
//importamos el modelo
import { Puntaje } from 'src/app/core/models/Puntaje';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-puntuacion',
  templateUrl: './editar-puntuacion.component.html',
  styleUrls: ['./editar-puntuacion.component.scss'],
})
export class EditarPuntuacionComponent implements OnInit {
  puntu: Puntaje[];
  idUser: string;
  constructor(
    public router: Router,
    public servicePuntuacion: PuntuacionService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.servicePuntuacion.getById(this.idUser).then((datoRetos) => {
      return (this.puntu = datoRetos);
    });
  }

  editarPuntuacion(idDocument, idReto, puntu: Puntaje) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.servicePuntuacion.updatePuntaje(idDocument, idReto, puntu);
    this.router.navigate(['admin/puntaje']);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '¡Editadoo Correctamente!',
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

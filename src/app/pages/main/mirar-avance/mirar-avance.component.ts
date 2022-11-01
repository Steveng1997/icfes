import { Component, OnInit, Inject } from '@angular/core';
//importamos el servicio
import { PuntuacionService } from 'src/app/core/services/puntaje.service';
//importamos los modulos para formularios
import { FormBuilder } from '@angular/forms';
import { ListadopuntajeComponent } from '../listadopuntaje/listadopuntaje.component';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Puntaje } from 'src/app/core/models/Puntaje';

import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-mirar-avance',
  templateUrl: 'mirar-avance.component.html',
  styleUrls: ['mirar-avance.component.scss'],
})
export class MirarAvanceComponent implements OnInit {
  puntajes: Puntaje[];
  idUser: string;

  constructor(
    public router: Router,
    public servicePuntaje: PuntuacionService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.servicePuntaje.getPuntajeByIdUsuario(this.idUser)
      .then((respuestaPuntaje) => {
        this.puntajes = respuestaPuntaje;
      });
      
  }

  mostrarDialogo(): void {
    this.dialog.open(ListadopuntajeComponent, {
        data: `¿Te gusta programar en TypeScript?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          alert("¡A mí también!");
        } else {
          alert("Deberías probarlo, a mí me gusta :)");
        }
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ListadopuntajeComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  salir() {
    this.router.navigate(['']);
  }

}

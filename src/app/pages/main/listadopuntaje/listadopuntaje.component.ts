import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Puntaje } from 'src/app/core/models/Puntaje';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-listadopuntaje',
  templateUrl: './listadopuntaje.component.html',
  styleUrls: ['./listadopuntaje.component.scss'],
})
export class ListadopuntajeComponent implements OnInit {
  puntaje: any[] = [];
  datosPuntaje: Puntaje[];
  public page!: number;

  constructor(
    public router: Router,
    public servicePuntuacion: PuntuacionService,
    public dialogRef: MatDialogRef<ListadopuntajeComponent>
  ) {}

  ngOnInit(): void {
    this.getPuntaje();
  }

  getPuntaje() {
    this.servicePuntuacion.getPuntajes().subscribe((datosPuntaje) => {
      this.puntaje = datosPuntaje;
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}

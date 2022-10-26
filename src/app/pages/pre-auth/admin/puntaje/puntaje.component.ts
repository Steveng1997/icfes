import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.scss'],
})
export class PuntajeComponent implements OnInit {
  puntaje: any[] = [];
  public page!: number;
  constructor(
    public router: Router,
    public servicePuntuacion: PuntuacionService
  ) {}

  ngOnInit(): void {
    this.getPuntaje();
  }

  Agregar() {
    this.router.navigate(['admin/insertar-puntaje']);
  }

  getPuntaje() {
    this.servicePuntuacion.getPuntaje().subscribe((data) => {
      this.puntaje = [];
      data.forEach((element: any) => {
        this.puntaje.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  DeletePuntaje(id: string) {
    const confirmation = confirm('Deseas eliminar el registro');
    if (confirmation) {
      this.servicePuntuacion.deletePuntaje(id);
    }
  }
}

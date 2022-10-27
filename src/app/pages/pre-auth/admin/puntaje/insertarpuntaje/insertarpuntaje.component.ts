import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuntuacionService } from 'src/app/core/services/puntaje.service';

@Component({
  selector: 'app-insertarpuntaje',
  templateUrl: './insertarpuntaje.component.html',
  styleUrls: ['./insertarpuntaje.component.scss'],
})
export class InsertarpuntajeComponent implements OnInit {
  public puntuacion: number = 0;

  constructor(
    public router: Router,
    public servicePuntuacion: PuntuacionService
  ) { }

  ngOnInit(): void { }

  addPuntuacion() {
    if (this.puntuacion != 0) {
      this.servicePuntuacion
        .registerPuntacion(this.puntuacion)
        .then((res) => {
          alert('Puntaje insertado');
          this.router.navigate(['admin/puntaje']);
        })
        .catch((err) => console.log('err', err.message));
    } else {
      alert('Campo vacio');
    }
  }
}

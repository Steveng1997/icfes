import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reto-amigo',
  templateUrl: 'reto-amigo.component.html',
  styleUrls: ['reto-amigo.component.scss']
})
export class RetoAmigoComponent implements OnInit {

  lista: string[] = ["Camilo","Rafael","Steven"];

  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Retar() {
    if(this.opcionSeleccionado != '0')
    {
      this.router.navigate(['areas']);
    } else {
      alert("Selecciona a quien quieres retar");
    }
    
  }
}

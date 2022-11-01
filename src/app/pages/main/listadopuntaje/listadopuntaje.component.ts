import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-listadopuntaje',
  templateUrl: './listadopuntaje.component.html',
  styleUrls: ['./listadopuntaje.component.scss']
})
export class ListadopuntajeComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<ListadopuntajeComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }

}
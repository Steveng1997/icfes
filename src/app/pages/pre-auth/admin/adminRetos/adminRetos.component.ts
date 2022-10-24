import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetoService } from 'src/app/core/services/retos.service';


@Component({
  selector: 'app-adminRetos',
  templateUrl: './adminRetos.component.html',
  styleUrls: ['./adminRetos.component.scss']
})
export class AdminRetosComponent implements OnInit {

  retos: any[] = [];
  public page!: number;

  constructor(public router: Router,
    public serviceRetos: RetoService
  ) { }

  ngOnInit(): void {
    this.getRetos()
  }

  Agregar() {
    this.router.navigate(['admin/insertar-retos'])
  }

  getRetos() {
    this.serviceRetos.getRetosByCategoria().subscribe(data => {
      this.retos = [];
      data.forEach((element: any) => {
        this.retos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  DeleteUser(id: string) {
    const confirmation = confirm('Deseas eliminar el registro');
    if (confirmation) {
      this.serviceRetos.deleteUsuario(id)
    }
  }
}

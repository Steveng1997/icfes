import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreaService } from 'src/app/core/services/area.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  areas: any[] = [];

  constructor(public router: Router,
    public serviceAreas: AreaService
  ) { }

  ngOnInit(): void {
    this.getEmpleados()
  }

  Agregar() {
    this.router.navigate(['admin/insertar-areas'])
  }

  getEmpleados() {
    this.serviceAreas.getAreas().subscribe(data => {
      this.areas = [];
      data.forEach((element: any) => {
        this.areas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  DeleteUser(id: string) {
    const confirmation = confirm('Deseas eliminar el registro');
    if (confirmation) {
      this.serviceAreas.deleteUsuario(id)
    }
  }


  editUser(id:string){
    this.router.navigate(['admin/editar-usuario/' + id])
  }

  // https://www.youtube.com/watch?v=6imqWpexo1g

}

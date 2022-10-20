import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  public page!: number;

  constructor(public router: Router,
    public serviceLogin: LoginService
  ) { }

  ngOnInit(): void {
    this.getEmpleados()
  }

  Agregar() {
    this.router.navigate(['admin/insertar-usuario'])
  }

  getEmpleados() {
    this.serviceLogin.getUsuarios().subscribe(data => {
      this.usuarios = [];
      data.forEach((element: any) => {
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  DeleteUser(id: string) {
    const confirmation = confirm('Deseas eliminar el registro');
    if (confirmation) {
      this.serviceLogin.deleteUsuario(id)
    }
  }


  editUser(id:string){
    this.router.navigate(['admin/editar-usuario/' + id])
  }

  // https://www.youtube.com/watch?v=6imqWpexo1g

}

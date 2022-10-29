import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  public page!: number;

  constructor(public router: Router, public serviceLogin: LoginService) {}

  ngOnInit(): void {
    this.getEmpleadosByDocument();
  }

  Agregar() {
    this.router.navigate(['admin/insertar-usuario']);
  }

  getEmpleadosByDocument() {
    this.serviceLogin.getUsuarios().then((datosUsers) => {
      setTimeout(() => {
        this.usuarios = datosUsers;
      }, 1000);
      
    });
  }

  DeleteUser(idDocumentReto, id) {
    Swal.fire({
      title: '¿Deseas eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Deseo eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Eliminado Correctamente!',
          showConfirmButton: false,
          timer: 2500,
        });

        this.serviceLogin.deleteUsuario(idDocumentReto, id);
        this.getEmpleadosByDocument();
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  idUser: string;
  public page!: number;

  constructor(
    public router: Router,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.getEmpleados();
  }

  Agregar() {
    this.router.navigate([
      `admin/${this.idUser}/insertar-usuario/${this.idUser}`,
    ]);
  }

  getEmpleados() {
    this.serviceLogin.getUsuarios().subscribe((datosUsers) => {
      this.usuarios = datosUsers;
    });
  }

  DeleteUser(id) {
    this.serviceLogin.getUsuariosByDocument(id).then((datosUsers) => {
      if (datosUsers) {
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
            this.serviceLogin.deleteUsuario(datosUsers[0]['idDocument'], id);
            this.getEmpleados();
          }
        });
      }
    });
  }
}

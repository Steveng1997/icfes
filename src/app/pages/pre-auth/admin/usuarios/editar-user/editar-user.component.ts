import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { LoginService } from 'src/app/core/services/login.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss'],
})
export class EditarUserComponent implements OnInit {
  usua: Usuario[];
  idUser: string;

  constructor(
    public postService: LoginService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.postService.getById(this.idUser).then((datosEstudiante) => {
      return (this.usua = datosEstudiante);
    });
  }

  editarReto(idDocument, idEstudiante, usu: Usuario) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.postService.updateUsuarios(idDocument, idEstudiante, usu);
    this.router.navigate(['admin/usuarios']);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '¡Editado Correctamente!',
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

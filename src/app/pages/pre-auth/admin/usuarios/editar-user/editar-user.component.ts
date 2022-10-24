import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { LoginService } from 'src/app/core/services/login.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/core/models/login';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss'],
})
export class EditarUserComponent implements OnInit {

  usua: Usuario[];

  constructor(
    public postService: LoginService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.postService.getById(id).subscribe((res) => {
      this.usua = res;
    });
  }

  editarReto(usu: Usuario) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.postService.updateUsuarios(usu);
    this.router.navigate(['admin/usuarios']);
  }
}

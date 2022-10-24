import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { LoginService } from 'src/app/core/services/login.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss'],
})
export class EditarUserComponent implements OnInit {
  public formEditar: FormGroup;
  postRef: any;

  constructor(
    public postService: LoginService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formEditar = this.formBuilder.group({
      email: [''],
      nombre: [''],
      password: [''],
      rol: [''],
    });
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.postService.getById(id).subscribe((res) => {
      this.postRef = res;
      this.formEditar = this.formBuilder.group({
        email: [this.postRef.email],
        nombre: [this.postRef.nombre],
        password: [this.postRef.password],
        rol: [this.postRef.rol],
      });
    });
  }

  editarReto() {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.postService.updateRetos(this.formEditar.value, id);
    this.router.navigate(['']);
    //console.log(this.editForm.value) //podemos ver los valores capturados
  }
}

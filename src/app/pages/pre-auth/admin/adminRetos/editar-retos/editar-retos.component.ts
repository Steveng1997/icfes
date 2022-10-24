import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { RetoService } from 'src/app/core/services/retos.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar-retos',
  templateUrl: './editar-retos.component.html',
  styleUrls: ['./editar-retos.component.scss'],
})
export class EditarRetosComponent implements OnInit {
  public formEditar: FormGroup;
  postRef: any;
  urlImage: Observable<string>;
  selectedImage: any = null;
  imgSrc: string;

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {
    this.formEditar = this.formBuilder.group({
      categoria: [''],
      pregunta: [''],
      imageUrl: [''],
      opcion1: [''],
      opcion2: [''],
      opcion3: [''],
      opcion4: [''],
      respuesta: [''],
    });
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetos.getById(id).subscribe((res) => {
      this.postRef = res;
      this.formEditar = this.formBuilder.group({
        categoria: [this.postRef.categoria],
        pregunta: [this.postRef.pregunta],
        imageUrl: [this.postRef.imageUrl],
        opcion1: [this.postRef.opcion1],
        opcion2: [this.postRef.opcion2],
        opcion3: [this.postRef.opcion3],
        opcion4: [this.postRef.opcion4],
        respuesta: [this.postRef.respuesta],
      });
    });
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      // this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  editarReto() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetos.updateRetos(this.formEditar.value, id);

    this.router.navigate(['admin/retos']);
  }
}

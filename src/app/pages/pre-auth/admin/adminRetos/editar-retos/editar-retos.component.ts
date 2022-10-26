import { Component, OnInit } from '@angular/core';

//importamos el servicio
import { RetoService } from 'src/app/core/services/retos.service';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Retos } from 'src/app/core/models/retos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-retos',
  templateUrl: './editar-retos.component.html',
  styleUrls: ['./editar-retos.component.scss'],
})
export class EditarRetosComponent implements OnInit {
  urlImage: Observable<string>;
  selectedImage: any = null;
  imgSrc: string;
  reto: Retos[];

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetos.getById(id).subscribe((res) => {
      this.reto = res;
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

  editarReto(reto: Retos) {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetos.updateRetos(reto);
    this.router.navigate(['admin/retos']);
    Swal.fire('Good job!', 'Reto editato!', 'success');
  }
}

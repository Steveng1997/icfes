import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/core/services/login.service';
import { RetoPersonalService } from 'src/app/core/services/retoPersonal.service';
import { RetoPesonal } from 'src/app/core/models/retoPersonal';

@Component({
  selector: 'app-pregunta-personal',
  templateUrl: './pregunta-personal.component.html',
  styleUrls: ['./pregunta-personal.component.scss'],
})
export class PreguntaPersonalComponent implements OnInit {
  idUser: string;
  categoria: string;
  reto: RetoPesonal[];

  imagetexto1: any;
  imagetexto2: any;
  imageTxtOpc1: any;
  imageTxtOpc2: any;
  imageTxtOpc3: any;
  imageTxtOpc4: any;
  imageTxtResp: any;

  // Si or Not
  selectSiNo: any;

  formTemplate = new FormGroup({
    categoria: new FormControl(''),
    texto1: new FormControl(''),
    imageUrl: new FormControl(''),
    texto2: new FormControl(''),
    opcion1: new FormControl(''),
    imageOpcion1: new FormControl(''),
    opcion2: new FormControl(''),
    imageOpcion2: new FormControl(''),
    opcion3: new FormControl(''),
    imageOpcion3: new FormControl(''),
    opcion4: new FormControl(''),
    imageOpcion4: new FormControl(''),
    image2: new FormControl(''),
    subtitulo: new FormControl(''),
    respuesta: new FormControl(''),
    imageResp: new FormControl(''),
  });

  SiNo(e) {
    this.selectSiNo = e.target.value;
  }

  constructor(
    public router: Router,
    public serviceRetoPersonal: RetoPersonalService,
    public storage: AngularFireStorage,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetoPersonal.getById(this.idUser).then((datoRetos) => {
      return (this.reto = datoRetos);
    });

    this.categoria = this.activeRoute.snapshot.paramMap.get('categoria');
  }

  ImageTexto(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        this.imagetexto1 = reader.result;
      }
    };
  }

  imageUrl2(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        this.imagetexto2 = reader.result;
      }
    };
  }

  UrlOpcion1(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        this.imageTxtOpc1 = reader.result;
      }
    };
  }

  UrlOpcion2(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        this.imageTxtOpc2 = reader.result;
      }
    };
  }

  UrlOpcion3(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        this.imageTxtOpc3 = reader.result;
      }
    };
  }

  UrlOpcion4(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png'
      ) {
        this.imageTxtOpc4 = reader.result;
      }
    };
  }

  imageRespuesta(fileInput) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (
        file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png'
      ) {
        this.imageTxtResp = reader.result;
      }
    };
  }

  addReto(formValue) {
    this.serviceRetoPersonal.registerRetos(this.idUser, this.categoria, formValue).then((rp) => {
      if (rp) {
        this.serviceRetoPersonal.getByInsert(rp['id']).then((respuesta) => {
          if (respuesta) {

            // Imagen 1
            if (this.imagetexto1 != '') {
              this.serviceRetoPersonal.updateImage1(
                respuesta['idDocument'],
                respuesta['id'],
                this.imagetexto1
              );
            }
            // Fin imagen 1

            // Imagen2
            if (this.imagetexto2 != '') {
              this.serviceRetoPersonal.updateImg2(
                respuesta['idDocument'],
                respuesta['id'],
                this.imagetexto2
              );
            }
            // Fin imagen 2

            // ImagenOpcion1
            if (this.imageTxtOpc1 != '') {
              this.serviceRetoPersonal.updateOpcImage1(
                respuesta['idDocument'],
                respuesta['id'],
                this.imageTxtOpc1
              );
            }
            // Fin ImageOption1

            // ImageOption2
            if (this.imageTxtOpc2 != '') {
              this.serviceRetoPersonal.updateOpcImage2(
                respuesta['idDocument'],
                respuesta['id'],
                this.imageTxtOpc2
              );
            }
            // Fin ImageOption2

            // ImageOption3
            if (this.imageTxtOpc3 != '') {
              this.serviceRetoPersonal.updateOpcImage3(
                respuesta['idDocument'],
                respuesta['id'],
                this.imageTxtOpc3
              );
            }
            // Fin ImageOption3

            // ImageOption4
            if (this.imageTxtOpc4 != '') {
              this.serviceRetoPersonal.updateOpcImage4(
                respuesta['idDocument'],
                respuesta['id'],
                this.imageTxtOpc4
              );
            }
            // Fin ImageOption4

            // Image respuesta
            if (this.imageTxtResp != '') {
              this.serviceRetoPersonal.updateOpcImageResp(
                respuesta['idDocument'],
                respuesta['id'],
                this.imageTxtResp
              );
            }
            // Fin image respuesta

            this.router.navigate([`resPerson/${this.idUser}/${this.categoria}`]);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '¡Insertado Correctamente!',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  }
}

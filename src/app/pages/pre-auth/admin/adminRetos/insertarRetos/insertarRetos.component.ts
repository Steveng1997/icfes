import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RetoService } from 'src/app/core/services/retos.service';
import { LoginService } from 'src/app/core/services/login.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertarRetos',
  templateUrl: './insertarRetos.component.html',
  styleUrls: ['./insertarRetos.component.scss'],
})
export class InsertarRetosComponent implements OnInit {

  imagetexto1: any;
  imagetexto2: any;
  imageTxtOpc1: any;
  imageTxtOpc2: any;
  imageTxtOpc3: any;
  imageTxtOpc4: any;
  imageTxtResp: any;

  idUser: string;

  // Si or Not
  selectSiNo: any;
  selectCategoria: any;

  formTemplate = new FormGroup({
    categoria: new FormControl(''),
    texto1: new FormControl(''),
    texto2: new FormControl(''),
    opcion1: new FormControl(''),
    imageUrl: new FormControl(''),
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
    titulo: new FormControl('')
  });

  SiNo(e) {
    this.selectSiNo = e.target.value;
  }

  opcCategoria(e){
    this.selectCategoria = e.target.value;
  }

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    public storage: AngularFireStorage,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
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
    if (this.formTemplate.value.categoria != '') {
      this.serviceRetos.registerRetos(formValue).then((rp) => {
        if (rp) {
          this.serviceRetos.getByInsert(rp['id']).then((respuesta) => {
            if (respuesta) {

              // Imagen 1
              if (this.imagetexto1 != undefined) {
                this.serviceRetos.updateImage1(
                  respuesta['idDocument'],
                  respuesta['id'],
                  this.imagetexto1
                );
              } else {
                Swal.fire('No has seleccionado ninguna imagen')
              }
              // Fin imagen 1

              // Imagen2
              if (this.imagetexto2 != undefined) {
                this.serviceRetos.updateImg2(
                  respuesta['idDocument'],
                  respuesta['id'],
                  this.imagetexto2
                );
              } else {
                Swal.fire('No has seleccionado ninguna imagen')
              }
              // Fin imagen 2

              // ImagenOpcion1
              if (this.imageTxtOpc1 != undefined) {
                this.serviceRetos.updateOpcImage1(
                  respuesta['idDocument'],
                  respuesta['id'],
                  this.imageTxtOpc1
                );
              }
              // Fin ImageOption1

              // ImageOption2
              if (this.imageTxtOpc2 != undefined) {
                this.serviceRetos.updateOpcImage2(
                  respuesta['idDocument'],
                  respuesta['id'],
                  this.imageTxtOpc2
                );
              }
              // Fin ImageOption2

              // ImageOption3
              if (this.imageTxtOpc3 != undefined) {
                this.serviceRetos.updateOpcImage3(
                  respuesta['idDocument'],
                  respuesta['id'],
                  this.imageTxtOpc3
                );
              }
              // Fin ImageOption3

              // ImageOption4
              if (this.imageTxtOpc4 != undefined) {
                this.serviceRetos.updateOpcImage4(
                  respuesta['idDocument'],
                  respuesta['id'],
                  this.imageTxtOpc4
                );
              }
              // Fin ImageOption4

              // Image respuesta
              if (this.imageTxtResp != undefined) {
                this.serviceRetos.updateOpcImageResp(
                  respuesta['idDocument'],
                  respuesta['id'],
                  this.imageTxtResp
                );
              }
              // Fin image respuesta

              this.router.navigate([
                `admin/${this.idUser}/adminRetos/${this.idUser}`,
              ]);
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo de la categoria esta vacia',
      });
    }
  }
}

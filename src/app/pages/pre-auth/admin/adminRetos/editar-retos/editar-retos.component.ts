import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
//importamos el servicio
import { RetoService } from 'src/app/core/services/retos.service';
import { LoginService } from 'src/app/core/services/login.service';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
//importamos modelos
import { Retos } from 'src/app/core/models/retos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-retos',
  templateUrl: './editar-retos.component.html',
  styleUrls: ['./editar-retos.component.scss'],
})
export class EditarRetosComponent implements OnInit {
  reto: Retos[];
  idUser: string;

  // Valores para imagenes
  selectImg1: any;

  selectImg2: any;

  // OpcionesImagenes
  selectOpc1: any;

  selectOpc2: any;

  selectOpc3: any;

  selectOpc4: any;

  selectResp: any;
  // Fin valores

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    public serviceLogin: LoginService,
    private activeRoute: ActivatedRoute,
    public storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceLogin.getById(this.idUser);
    this.serviceRetos.getById(this.idUser).then((datoRetos) => {
      return (this.reto = datoRetos);
    });
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
        this.selectImg1 = reader.result;
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
        this.selectImg2 = reader.result;
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
        this.selectOpc1 = reader.result;
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
        this.selectOpc2 = reader.result;
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
        this.selectOpc3 = reader.result;
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
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        this.selectOpc4 = reader.result;
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
        file.type == 'image/png' ||
        file.type == 'image/jpeg'
      ) {
        this.selectResp = reader.result;
      }
    };
  }

  editarReto(idDocument, idReto, reto: Retos) {
    // this.serviceRetos.updateRetos(idDocument, idReto, reto);

    // Imagen1
    if (this.selectImg1 != null) {
      this.serviceRetos.updateImage1(
        idDocument,
        idReto,
        this.selectImg1
      );
    }
    // Fin imagen 1

    // Imagen 2
    if (this.selectImg2 != null) {
      this.serviceRetos.updateImg2(idDocument, idReto, this.selectImg2
      );
    }

    // Imagen opcion 1
    if (this.selectOpc1 != null) {
      this.serviceRetos.updateOpcImage1(
        idDocument,
        idReto,
        this.selectOpc1
      );
    }
    // Fin imagen opcion 1

    // Imagen opcion 2
    if (this.selectOpc2 != null) {
      this.serviceRetos.updateOpcImage2(
        idDocument,
        idReto,
        this.selectOpc2
      );
    }
    // Fin imagen opcion 2

    // Imagen opcion 3
    if (this.selectOpc3 != null) {
      this.serviceRetos.updateOpcImage3(
        idDocument,
        idReto,
        this.selectOpc3
      );
    }
    // Fin imagen opcion 3

    // Imagen opcion 4
    if (this.selectOpc4 != null) {
      this.serviceRetos.updateOpcImage4(
        idDocument,
        idReto,
        this.selectOpc4
      );
    }

    // Imagen respuesta
    if (this.selectResp != null) {
      this.serviceRetos.updateOpcImageResp(
        idDocument,
        idReto,
        this.selectResp
      );
    }
    // Fin imagen respuesta

    this.router.navigate([`admin/${this.idUser}/adminRetos/${this.idUser}`]);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '¡Editado correctamente!',
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

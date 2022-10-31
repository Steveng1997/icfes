import { Component, OnInit } from '@angular/core';
//importamos el servicio
import { RetoService } from 'src/app/core/services/retos.service';
//importamos el enrutador
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Retos } from 'src/app/core/models/retos';
import Swal from 'sweetalert2';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-editar-retos',
  templateUrl: './editar-retos.component.html',
  styleUrls: ['./editar-retos.component.scss'],
})
export class EditarRetosComponent implements OnInit {
  reto: Retos[];
  idUser: string;

  // Valores para imagenes
  selectImg1: string;
  selectedImage: any = null;
  imgSrc: string;

  selectImg2: string;
  imgSrc2: string;
  selectedImage2: any = null;

  // OpcionesImagenes
  selectOpc1: string;
  imgOpcion1: string;
  SelectImgOpcion1: any = null;

  selectOpc2: string;
  imgOpcion2: string;
  SelectImgOpcion2: any = null;

  selectOpc3: string;
  imgOpcion3: string;
  SelectImgOpcion3: any = null;

  selectOpc4: string;
  imgOpcion4: string;
  SelectImgOpcion4: any = null;

  selectResp: string;
  imgRes: string;
  SelectImgRes: any = null;
  // Fin valores

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    private activeRoute: ActivatedRoute,
    public storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetos.getById(this.idUser).then((datoRetos) => {
      return (this.reto = datoRetos);
    });
  }

  ImageTexto(event1: any) {
    if (event1.target.files && event1.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event1.target.files[0]);
      this.selectedImage = event1.target.files[0];
    } else {
      this.selectedImage = null;
    }
  }

  imageUrl2(event2: any) {
    if (event2.target.files && event2.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc2 = e.target.result);
      reader.readAsDataURL(event2.target.files[0]);
      this.selectedImage2 = event2.target.files[0];
    } else {
      this.selectedImage2 = null;
    }
  }

  UrlOpcion1(event3: any) {
    if (event3.target.files && event3.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgOpcion1 = e.target.result);
      reader.readAsDataURL(event3.target.files[0]);
      this.SelectImgOpcion1 = event3.target.files[0];
    } else {
      this.SelectImgOpcion1 = null;
    }
  }

  UrlOpcion2(event4: any) {
    if (event4.target.files && event4.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgOpcion2 = e.target.result);
      reader.readAsDataURL(event4.target.files[0]);
      this.SelectImgOpcion2 = event4.target.files[0];
    } else {
      this.SelectImgOpcion2 = null;
    }
  }

  UrlOpcion3(event5: any) {
    if (event5.target.files && event5.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgOpcion3 = e.target.result);
      reader.readAsDataURL(event5.target.files[0]);
      this.SelectImgOpcion3 = event5.target.files[0];
    } else {
      this.SelectImgOpcion3 = null;
    }
  }

  UrlOpcion4(event6: any) {
    if (event6.target.files && event6.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgOpcion4 = e.target.result);
      reader.readAsDataURL(event6.target.files[0]);
      this.SelectImgOpcion4 = event6.target.files[0];
    } else {
      this.SelectImgOpcion4 = null;
    }
  }

  imageRespuesta(eventResp: any) {
    if (eventResp.target.files && eventResp.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgRes = e.target.result);
      reader.readAsDataURL(eventResp.target.files[0]);
      this.SelectImgRes = eventResp.target.files[0];
    } else {
      this.SelectImgRes = null;
    }
  }

  editarReto(idDocument, idReto, reto: Retos) {
    // this.serviceRetos.updateRetos(idDocument, idReto, reto);

    // Imagen1
    if (this.selectImg1 != null) {
      var filePath = `${'imagenes'}/${this.selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.selectImg1 = url;
              this.serviceRetos.updateImage1(
                idDocument,
                idReto,
                this.selectImg1
              );
              this.router.navigate(['admin/adminRetos']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Editado correctamente!',
                showConfirmButton: false,
                timer: 2500,
              });
            });
          })
        )
        .subscribe();
    }
    // Fin imagen 1

    // Imagen 2
    if (this.selectImg2 != null) {
      var filePath2 = `${'imagenes'}/${this.selectedImage2.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef2 = this.storage.ref(filePath2);
      this.storage
        .upload(filePath2, this.selectedImage2)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef2.getDownloadURL().subscribe((url2) => {
              this.selectImg2 = url2;
              this.serviceRetos.updateImg2(idDocument, idReto, this.selectImg2);
              this.router.navigate(['admin/adminRetos']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Editado correctamente!',
                showConfirmButton: false,
                timer: 2500,
              });
            });
          })
        )
        .subscribe();
    }

    // Imagen opcion 1
    if (this.selectOpc1 != null) {
      var filePath3 = `${'imagenes'}/${this.SelectImgOpcion1.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef3 = this.storage.ref(filePath3);
      this.storage
        .upload(filePath3, this.SelectImgOpcion1)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef3.getDownloadURL().subscribe((url3) => {
              this.selectOpc1 = url3;
              this.serviceRetos.updateOpcImage1(
                idDocument,
                idReto,
                this.selectOpc1,
                this.SelectImgOpcion1.name
              );
              this.router.navigate(['admin/adminRetos']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Editado correctamente!',
                showConfirmButton: false,
                timer: 2500,
              });
            });
          })
        )
        .subscribe();
    }
    // Fin imagen opcion 1

    // Imagen opcion 2
    if (this.selectOpc2 != null) {
      // Imagen1
      var filePath4 = `${'imagenes'}/${this.SelectImgOpcion2.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef4 = this.storage.ref(filePath4);
      this.storage
        .upload(filePath4, this.SelectImgOpcion2)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef4.getDownloadURL().subscribe((url4) => {
              this.selectOpc2 = url4;
              this.serviceRetos.updateOpcImage2(
                idDocument,
                idReto,
                this.selectOpc2,
                this.SelectImgOpcion2.name
              );
              this.router.navigate(['admin/adminRetos']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Editado correctamente!',
                showConfirmButton: false,
                timer: 2500,
              });
            });
          })
        )
        .subscribe();
    }
    // Fin imagen opcion 2

    // Imagen opcion 3
    if (this.selectOpc3 != null) {
      var filePath5 = `${'imagenes'}/${this.SelectImgOpcion3.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef5 = this.storage.ref(filePath5);
      this.storage
        .upload(filePath5, this.SelectImgOpcion3)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef5.getDownloadURL().subscribe((url5) => {
              this.selectOpc3 = url5;
              this.serviceRetos.updateOpcImage3(
                idDocument,
                idReto,
                this.selectOpc3,
                this.SelectImgOpcion3.name
              );
              this.router.navigate(['admin/adminRetos']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Editado correctamente!',
                showConfirmButton: false,
                timer: 2500,
              });
            });
          })
        )
        .subscribe();
    }
    // Fin imagen opcion 3

    // Imagen opcion 4
    if (this.selectOpc4 != null) {
      // Imagen1
      var filePath6 = `${'imagenes'}/${this.SelectImgOpcion4.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef6 = this.storage.ref(filePath6);
      this.storage
        .upload(filePath6, this.SelectImgOpcion4)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef6.getDownloadURL().subscribe((url6) => {
              this.selectOpc4 = url6;
              this.serviceRetos.updateOpcImage4(
                idDocument,
                idReto,
                this.selectOpc4,
                this.SelectImgOpcion4.name
              );
              this.router.navigate(['admin/adminRetos']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Editado correctamente!',
                showConfirmButton: false,
                timer: 2500,
              });
            });
          })
        )
        .subscribe();
    }

    // Imagen respuesta
    if (this.selectResp != null) {
      var filePath7 = `${'imagenes'}/${this.SelectImgRes.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef7 = this.storage.ref(filePath7);
      this.storage
        .upload(filePath7, this.SelectImgRes)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef7.getDownloadURL().subscribe((url7) => {
              this.selectResp = url7;
              this.serviceRetos.updateOpcImageResp(
                idDocument,
                idReto,
                this.selectResp,
                this.SelectImgRes.name
              );
              this.router.navigate(['admin/adminRetos']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '¡Editado correctamente!',
                showConfirmButton: false,
                timer: 2500,
              });
            });
          })
        )
        .subscribe();
    }
    // Fin imagen respuesta
  }
}

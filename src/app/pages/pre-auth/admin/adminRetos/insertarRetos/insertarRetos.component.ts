import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RetoService } from 'src/app/core/services/retos.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertarRetos',
  templateUrl: './insertarRetos.component.html',
  styleUrls: ['./insertarRetos.component.scss'],
})
export class InsertarRetosComponent implements OnInit {
  selectedImage: any = null;
  imgSrc: string;

  imgSrc2: string;
  selectedImage2: any = null;

  // OpcionesImagenes
  imgOpcion1: string;
  SelectImgOpcion1: any = null;

  imgOpcion2: string;
  SelectImgOpcion2: any = null;

  imgOpcion3: string;
  SelectImgOpcion3: any = null;

  imgOpcion4: string;
  SelectImgOpcion4: any = null;

  imgRes: string;
  SelectImgRes: any = null;

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
    public serviceRetos: RetoService,
    public storage: AngularFireStorage
  ) { }

  ngOnInit(): void { }

  ImageTexto(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
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

  UrlOpcion1(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgOpcion1 = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.SelectImgOpcion1 = event.target.files[0];
    } else {
      this.SelectImgOpcion1 = null;
    }
  }

  UrlOpcion2(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgOpcion2 = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.SelectImgOpcion2 = event.target.files[0];
    } else {
      this.SelectImgOpcion2 = null;
    }
  }

  UrlOpcion3(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgOpcion3 = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.SelectImgOpcion3 = event.target.files[0];
    } else {
      this.SelectImgOpcion3 = null;
    }
  }

  UrlOpcion4(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgOpcion4 = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.SelectImgOpcion4 = event.target.files[0];
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

  addReto(formValue) {
    if (this.formTemplate.value.categoria != '') {
      if (this.formTemplate.value.imageUrl != '') {
        // Imagen1
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
                formValue['imageUrl'] = url;
                setTimeout(() => {
                  this.serviceRetos.registerRetos(formValue);
                }, 1000);
              });
            })
          )
          .subscribe();
        // Fin imagen 1

        // Imagen2
        if (
          this.formTemplate.value.image2 != '' &&
          this.formTemplate.value.imageOpcion1 != ''
        ) {
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
                  formValue['image2'] = url2;
                  setTimeout(() => {
                    this.serviceRetos.updateImage2(
                      formValue,
                      formValue['image2']
                    );
                  }, 2000);

                  this.router.navigate(['admin/adminRetos']);
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Insertado Correctamente!',
                    showConfirmButton: false,
                    timer: 2500,
                  });
                });
              })
            )
            .subscribe();
        } else {
          this.router.navigate(['admin/adminRetos']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Insertado Correctamente!',
            showConfirmButton: false,
            timer: 2500,
          });
        }
        // Fin Imagen2

        // ImagenOpcion1
        if (this.formTemplate.value.imageOpcion1 != '') {
          var filePathOpcion1 = `${'imagenes'}/${this.SelectImgOpcion1.name
            .split('.')
            .slice(0, -1)
            .join('.')}_${new Date().getTime()}`;
          const fileRefOpcion1 = this.storage.ref(filePathOpcion1);
          this.storage
            .upload(filePathOpcion1, this.SelectImgOpcion1)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRefOpcion1.getDownloadURL().subscribe((urlImgOpcion1) => {
                  formValue['imageOpcion1'] = urlImgOpcion1;
                  setTimeout(() => {
                    this.serviceRetos.updateImageOpcion1(
                      formValue,
                      formValue['imageOpcion1']
                    );
                  }, 3000);
                });
              })
            )
            .subscribe();
        }
        // Fin ImageOption1

        // ImageOption2
        if (this.formTemplate.value.imageOpcion2 != '') {
          var filePathOpcion2 = `${'imagenes'}/${this.SelectImgOpcion2.name
            .split('.')
            .slice(0, -1)
            .join('.')}_${new Date().getTime()}`;
          const fileRefOpcion2 = this.storage.ref(filePathOpcion2);
          this.storage
            .upload(filePathOpcion2, this.SelectImgOpcion2)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRefOpcion2.getDownloadURL().subscribe((urlImgOpcion2) => {
                  formValue['imageOpcion2'] = urlImgOpcion2;
                  setTimeout(() => {
                    this.serviceRetos.updateImageOpcion2(
                      formValue,
                      formValue['imageOpcion2']
                    );
                  }, 4000);
                });
              })
            )
            .subscribe();
        }
        // Fin ImageOption2

        // ImageOption3
        if (this.formTemplate.value.imageOpcion3 != '') {
          var filePathOpcion3 = `${'imagenes'}/${this.SelectImgOpcion3.name
            .split('.')
            .slice(0, -1)
            .join('.')}_${new Date().getTime()}`;
          const fileRefOpcion3 = this.storage.ref(filePathOpcion3);
          this.storage
            .upload(filePathOpcion3, this.SelectImgOpcion3)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRefOpcion3.getDownloadURL().subscribe((urlImgOpcion3) => {
                  formValue['imageOpcion3'] = urlImgOpcion3;
                  setTimeout(() => {
                    this.serviceRetos.updateImageOpcion3(
                      formValue,
                      formValue['imageOpcion3']
                    );
                  }, 5000);
                });
              })
            )
            .subscribe();
        }
        // Fin ImageOption3

        // ImageOption4
        if (this.formTemplate.value.imageOpcion4 != '') {
          var filePathOpcion4 = `${'imagenes'}/${this.SelectImgOpcion4.name
            .split('.')
            .slice(0, -1)
            .join('.')}_${new Date().getTime()}`;
          const fileRefOpcion4 = this.storage.ref(filePathOpcion4);
          this.storage
            .upload(filePathOpcion4, this.SelectImgOpcion4)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRefOpcion4.getDownloadURL().subscribe((urlImgOpcion4) => {
                  formValue['imageOpcion4'] = urlImgOpcion4;
                  setTimeout(() => {
                    this.serviceRetos.updateImageOpcion4(
                      formValue,
                      formValue['imageOpcion4']
                    );
                  }, 6000);
                });
              })
            )
            .subscribe();
        }
        // Fin ImageOption4

        // ImageOption4
        if (this.formTemplate.value.imageResp != '') {
          var filePathRespuesta = `${'imagenes'}/${this.SelectImgRes.name
            .split('.')
            .slice(0, -1)
            .join('.')}_${new Date().getTime()}`;
          const fileRefResp = this.storage.ref(filePathRespuesta);
          this.storage
            .upload(filePathRespuesta, this.SelectImgRes)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRefResp.getDownloadURL().subscribe((urlImgResp) => {
                  formValue['imageResp'] = urlImgResp;
                  setTimeout(() => {
                    this.serviceRetos.updateImageResp(
                      formValue,
                      formValue['imageResp']
                    );
                  }, 7000);

                  this.router.navigate(['admin/adminRetos']);
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '¡Insertado Correctamente!',
                    showConfirmButton: false,
                    timer: 2500,
                  });
                });
              })
            )
            .subscribe();
        }
        // Fin ImageOption4
      } else {
        this.serviceRetos.registerRetos(formValue);
        this.router.navigate(['admin/adminRetos']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Insertado Correctamente!',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo de la categoria esta vacia',
      });
    }
  }
}

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

  // Si or Not
  selectSiNo: any;

  img1: string;
  img2: string;

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
  });

  SiNo(e) {
    this.selectSiNo = e.target.value;
  }

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    public storage: AngularFireStorage
  ) {}

  ngOnInit(): void {}

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
      reader.onload = (es: any) => (this.imgSrc2 = es.target.result);
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

  addReto(formValue) {
    if (this.formTemplate.value.categoria != '') {
      if (this.formTemplate.value.respuesta != '') {
        if (this.formTemplate.value.imageUrl != '') {
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
                  this.img1 = url;
                  this.serviceRetos.registerRetos(formValue, this.img1);
                });
              })
            )
            .subscribe();
        } else {
          this.serviceRetos.registerRetos(formValue, this.img1);
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
          text: 'El campo de la respuesta esta vacia',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo de la categoria esta vacia',
      });
    }

    // if (this.formTemplate.value.image2 != '') {
    //   var filePath2 = `${'imagenes'}/${this.selectedImage2.name
    //     .split('.')
    //     .slice(0, -1)
    //     .join('.')}_${new Date().getTime()}`;
    //   const fileRef2 = this.storage.ref(filePath2);
    //   this.storage
    //     .upload(filePath2, this.selectedImage2)
    //     .snapshotChanges()
    //     .pipe(
    //       finalize(() => {
    //         fileRef2.getDownloadURL().subscribe((url2) => {
    //           this.img2 = url2;
    //           this.serviceRetos.updateImageSubtitules(this.img2, formValue);
    //         });
    //       })
    //     )
    //     .subscribe();
    // }
  }
}

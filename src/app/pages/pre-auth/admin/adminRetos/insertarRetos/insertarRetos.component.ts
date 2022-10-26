import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RetoService } from 'src/app/core/services/retos.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertarRetos',
  templateUrl: './insertarRetos.component.html',
  styleUrls: ['./insertarRetos.component.scss'],
})
export class InsertarRetosComponent implements OnInit {
  // urlImage: Observable<string>;
  selectedImage: any = null;
  imgSrc: string;

  imgSrcSubtitulo: string;
  selectedImageSubtitulo: any = null;

  selectcat: any;

  formTemplate = new FormGroup({
    categoria: new FormControl(''),
    texto1: new FormControl(''),
    imageUrl: new FormControl(''),
    texto2: new FormControl(''),
    opcion1: new FormControl(''),
    opcion2: new FormControl(''),
    opcion3: new FormControl(''),
    opcion4: new FormControl(''),
    subtitulo: new FormControl(''),
    imageUrlSubtitulo: new FormControl(''),
    respuesta: new FormControl(''),
  });

  selectCategoria(e) {
    console.log(e.target.value);
    this.selectcat = e.target.value;
  }

  constructor(
    public router: Router,
    public serviceRetos: RetoService,
    public storage: AngularFireStorage
  ) {}

  ngOnInit(): void {}

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }
  }

  uploadImageSubtitulo(eventSub: any) {
    if (eventSub.target.files && eventSub.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (es: any) => (this.imgSrcSubtitulo = es.target.result);
      reader.readAsDataURL(eventSub.target.files[0]);
      this.selectedImageSubtitulo = eventSub.target.files[0];
    } else {
      this.selectedImageSubtitulo = null;
    }
  }

  addReto(formValue) {
    if (this.formTemplate.value.respuesta != '') {
      if (this.formTemplate.value.imageUrl != '') {
        // imagen 1
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

                this.serviceRetos.registerRetos(formValue);
                this.router.navigate(['admin/adminRetos']);
                alert('Reto insertado');
              });
            })
          )
          .subscribe();
        // Fin imagen 1
        if (this.formTemplate.value.imageUrlSubtitulo != '') {
          // Imagen 2
          var filePathSub = `${'imagenes'}/${this.selectedImageSubtitulo.name
            .split('.')
            .slice(0, -1)
            .join('.')}_${new Date().getTime()}`;
          const fileRefSub = this.storage.ref(filePathSub);
          this.storage
            .upload(filePathSub, this.selectedImageSubtitulo)
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRefSub.getDownloadURL().subscribe((urlSub) => {
                  formValue['imageUrlSubtitulo'] = urlSub;

                  // Fin imagen 2

                  this.serviceRetos.updateRetosForImagen(formValue);
                  this.router.navigate(['admin/adminRetos']);
                  alert('Reto insertado');
                });
              })
            )
            .subscribe();
        } else {
          this.serviceRetos.registerRetos(formValue);
          this.router.navigate(['admin/adminRetos']);
          Swal.fire('Good job!', 'Reto insertado!', 'success');
        }
      } else {
        this.serviceRetos.registerRetos(formValue);
        this.router.navigate(['admin/adminRetos']);
        Swal.fire('Good job!', 'Reto insertado!', 'success');
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Campo de la respuesta esta vacia',
      });
    }
  }
}

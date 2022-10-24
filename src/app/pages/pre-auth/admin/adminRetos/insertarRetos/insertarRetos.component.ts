import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RetoService } from 'src/app/core/services/retos.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-insertarRetos',
  templateUrl: './insertarRetos.component.html',
  styleUrls: ['./insertarRetos.component.scss'],
})
export class InsertarRetosComponent implements OnInit {
  urlImage: Observable<string>;
  selectedImage: any = null;
  imgSrc: string;

  formTemplate = new FormGroup({
    categoria: new FormControl(''),
    pregunta: new FormControl(''),
    imageUrl: new FormControl('', Validators.required),
    opcion1: new FormControl('', Validators.required),
    opcion2: new FormControl('', Validators.required),
    opcion3: new FormControl('', Validators.required),
    opcion4: new FormControl('', Validators.required),
    respuesta: new FormControl('', Validators.required),
  });

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

  addReto(formValue) {
    if (this.selectedImage != null) {
      var filePath = `${formValue.category}/${this.selectedImage.name
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
    } else {
      if (formValue.value != undefined && formValue != '') {
        this.serviceRetos.registerRetos(formValue);
        this.router.navigate(['admin/adminRetos']);
        alert('Reto insertado');
      } else {
        alert('Inserte registro');
      }
    }
  }
}

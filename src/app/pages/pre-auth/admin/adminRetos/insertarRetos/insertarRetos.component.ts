// import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { RetoService } from 'src/app/core/services/retos.service';

// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { finalize, Observable } from 'rxjs';

// @Component({
//   selector: 'app-insertarRetos',
//   templateUrl: './insertarRetos.component.html',
//   styleUrls: ['./insertarRetos.component.scss']
// })
// export class InsertarRetosComponent implements OnInit {

//   public nombre: string = '';
//   public password: string = '';
//   public pregunta: string = '';

//   opcionSeleccionado: string = '0';

//   uploadPercent: Observable<number>;
//   urlImage: Observable<string>;
//   @ViewChild('imageUser') inputImageUser: ElementRef;

//   constructor(
//     public router: Router,
//     public serviceRetos: RetoService,
//     public storage: AngularFireStorage,
//   ) { }

//   ngOnInit(): void {
//   }

//   uploadImage(e) {
//     const id = Math.random().toString(36).substring(2);
//     const file = e.target.files[0];
//     const filePath = `retos/profile_${id}`;
//     const ref = this.storage.ref(filePath);
//     const task = this.storage.upload(filePath, file);
//     this.uploadPercent = task.percentageChanges();
//     task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
//   }

//   addArea() {
//     this.serviceRetos.registerAreas(this.opcionSeleccionado, this.pregunta).then((res) => {
//       alert("Reto insertado para" + " " + this.opcionSeleccionado)
//       this.router.navigate(['admin/adminRetos'])
//     }).catch(err => console.log('err', err.message));
//   }
// }

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  public nombre: string = '';
  public password: string = '';
  public pregunta: string = '';

  urlImage: Observable<string>;
  // @ViewChild('imageUser') inputImageUser: ElementRef;

  selectedImage: any = null;
  imgSrc: string;

  formTemplate = new FormGroup({
    categoria: new FormControl(''),
    pregunta: new FormControl(''),
    imageUrl: new FormControl('', Validators.required),
    opcion1: new FormControl('', Validators.required),
    opcion2: new FormControl('', Validators.required),
    opcion3: new FormControl('', Validators.required),
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
      // this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  // addArea() {
  //   this.serviceRetos.registerAreas(this.opcionSeleccionado, this.pregunta).then((res) => {
  //     alert("Reto insertado para" + " " + this.opcionSeleccionado)
  //     this.router.navigate(['admin/adminRetos'])
  //   }).catch(err => console.log('err', err.message));
  // }

  addReto(formValue) {
    if (this.selectedImage != null && this.selectedImage != '') {
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
      this.serviceRetos.registerRetos(formValue);
      this.router.navigate(['admin/adminRetos']);
      alert('Reto insertado');
    }
  }
}

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

  // Valores para imagenes
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
  // Fin valores de imagenes

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

    urlImg1: new FormControl(''),
    urlImg2: new FormControl(''),
    urlImg3: new FormControl(''),
    urlImg4: new FormControl(''),
    urlImgResp: new FormControl(''),
  });

  SiNo(e) {
    this.selectSiNo = e.target.value;
  }

  constructor(
    public router: Router,
    public serviceRetoPersonal: RetoPersonalService,
    public storage: AngularFireStorage,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idUser = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceRetoPersonal.getById(this.idUser).then((datoRetos) => {
      return (this.reto = datoRetos);
    });

    this.categoria = this.activeRoute.snapshot.paramMap.get('categoria');
  }

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
    this.serviceRetoPersonal
      .registerRetos(this.idUser, this.categoria, formValue)
      .then((rp) => {
        if (rp) {
          this.serviceRetoPersonal.getByInsert(rp['id']).then((respuesta) => {
            if (respuesta) {
              // Imagen 1
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
                        formValue['imageUrl'] = url;
                        this.serviceRetoPersonal.updateImage1(
                          respuesta['idDocument'],
                          respuesta['id'],
                          formValue['imageUrl']
                        );
                      });
                    })
                  )
                  .subscribe();
              }
              // Fin imagen 1

              // Imagen2
              if (this.formTemplate.value.image2 != '') {
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
                        this.serviceRetoPersonal.updateImg2(
                          respuesta['idDocument'],
                          respuesta['id'],
                          formValue['image2']
                        );

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
              // Fin imagen 2

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
                      fileRefOpcion1
                        .getDownloadURL()
                        .subscribe((urlImgOpcion1) => {
                          formValue['imageOpcion1'] = urlImgOpcion1;
                          this.serviceRetoPersonal.updateOpcImage1(
                            respuesta['idDocument'],
                            respuesta['id'],
                            formValue['imageOpcion1'],
                            this.SelectImgOpcion1.name
                          );
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
                      fileRefOpcion2
                        .getDownloadURL()
                        .subscribe((urlImgOpcion2) => {
                          formValue['imageOpcion2'] = urlImgOpcion2;
                          this.serviceRetoPersonal.updateOpcImage2(
                            respuesta['idDocument'],
                            respuesta['id'],
                            formValue['imageOpcion2'],
                            this.SelectImgOpcion2.name
                          );
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
                      fileRefOpcion3
                        .getDownloadURL()
                        .subscribe((urlImgOpcion3) => {
                          formValue['imageOpcion3'] = urlImgOpcion3;
                          this.serviceRetoPersonal.updateOpcImage3(
                            respuesta['idDocument'],
                            respuesta['id'],
                            formValue['imageOpcion3'],
                            this.SelectImgOpcion3.name
                          );
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
                      fileRefOpcion4
                        .getDownloadURL()
                        .subscribe((urlImgOpcion4) => {
                          formValue['imageOpcion4'] = urlImgOpcion4;
                          this.serviceRetoPersonal.updateOpcImage4(
                            respuesta['idDocument'],
                            respuesta['id'],
                            formValue['imageOpcion4'],
                            this.SelectImgOpcion4.name
                          );
                        });
                    })
                  )
                  .subscribe();
              }
              // Fin ImageOption4

              // Image respuesta
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
                        this.serviceRetoPersonal.updateOpcImageResp(
                          respuesta['idDocument'],
                          respuesta['id'],
                          formValue['imageResp'],
                          this.SelectImgRes.name
                        );
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
              // Fin image respuesta
            }
          });
        }
      });

    this.router.navigate([`resPerson/${this.idUser}/${this.categoria}`]);
  }
}

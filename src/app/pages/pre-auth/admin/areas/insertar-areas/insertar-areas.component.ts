import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AreaService } from 'src/app/core/services/area.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-insertar-areas',
  templateUrl: './insertar-areas.component.html',
  styleUrls: ['./insertar-areas.component.scss']
})
export class InsertarAreasComponent implements OnInit {

  public nombre: string = '';
  public password: string = '';
  public texto: string = '';

  public contado = 0

  opcionSeleccionado: string = '0';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(
    public router: Router,
    public serviceAreas: AreaService,
    public storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
  }

  uploadImage(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `retos/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  addArea() {
    this.serviceAreas.registerAreas(this.opcionSeleccionado, this.texto).then((res) => {
      alert("Reto insertado para" + " " + this.opcionSeleccionado)
    }).catch(err => console.log('err', err.message));
  }
}
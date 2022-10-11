import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuarea',
  templateUrl: 'menuarea.component.html',
  styleUrls: ['menuarea.component.scss']
})
export class MenuareaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  salir() {
    this.router.navigate(['login']);
  }

  retoMatematicas(){
    this.router.navigate(['retos/categoria/lenguaje']);
  }

}

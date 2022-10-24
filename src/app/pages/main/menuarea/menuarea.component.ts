import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RetoService } from 'src/app/core/services/retos.service';

@Component({
  selector: 'app-menuarea',
  templateUrl: 'menuarea.component.html',
  styleUrls: ['menuarea.component.scss'],
})
export class MenuareaComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  salir() {
    this.router.navigate(['login']);
  }
}

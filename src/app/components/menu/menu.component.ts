import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  role: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('rol') || 'Rol no encontrado';
  }

  verificar() {
    return this.loginService.verificar();
  }

  cerrar() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

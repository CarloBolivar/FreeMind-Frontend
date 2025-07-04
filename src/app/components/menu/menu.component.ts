import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginService } from '../../services/login.service';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../models/rol';

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
  listaRoles: Rol[] = [];

  constructor(
    private loginService: LoginService,
    private rolService: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.rolService.list().subscribe((roles: Rol[]) => {
    this.listaRoles = roles;

    const token = sessionStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const nombreRol = payload.roles; 

      const rolEncontrado = this.listaRoles.find(r => r.nombre === nombreRol);
      this.role = rolEncontrado ? rolEncontrado.nombre : 'Rol no encontrado';
    }
  });
}
  getNombreRolPorId(idRol: number): string {
    const rolEncontrado = this.listaRoles.find(r => r.idRol === idRol);
    return rolEncontrado ? rolEncontrado.nombre : 'Rol no encontrado';
  }

  verificar() {
    return this.loginService.verificar();
  }

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

import { UsuarioService } from './../../services/usuario.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-filtrousuario',
  standalone: true,
  templateUrl: './filtrousuario.component.html',
  styleUrls: ['./filtrousuario.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class FiltrousuarioComponent {
  especialidad: string = '';
  idRol: number | null = null;
  resultados: Usuario[] = [];

  constructor(private UsuarioService: UsuarioService) {}

  filtrar(): void {
    let params: string[] = [];
    if (this.especialidad) params.push(`especialidad=${encodeURIComponent(this.especialidad)}`);
    if (this.idRol !== null && this.idRol !== undefined) params.push(`idRol=${this.idRol}`);
    const query = params.length > 0 ? `?${params.join('&')}` : '';
    this.UsuarioService.filtrarUsuarios(query).subscribe(data => {
      this.resultados = data;
    });
  }
}

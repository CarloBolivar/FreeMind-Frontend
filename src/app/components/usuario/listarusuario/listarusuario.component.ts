import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();
  listaRoles: Rol[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
    this.usuarioService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.rolService.list().subscribe(data => {
      this.listaRoles = data;
    });
  }

  eliminar(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarioService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
    });
  }

  getNombreRolPorId(idRol: number): string {
    const rolEncontrado = this.listaRoles.find(r => r.idRol === idRol);
    return rolEncontrado ? rolEncontrado.nombre : 'Rol no encontrado';
  }
}

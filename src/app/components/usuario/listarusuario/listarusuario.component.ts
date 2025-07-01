import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule 
  ],
  templateUrl: './listarusuario.component.html',
  styleUrls: ['./listarusuario.component.css']
})
export class ListarusuarioComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idUsuario', 'nombre', 'apellido', 'correo', 'rol', 'editar', 'eliminar'];

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  listaRoles: Rol[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.usuarioService.list().subscribe(data => {
      this.usuarioService.setList(data);
    });

    this.rolService.list().subscribe(data => {
      this.listaRoles = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number): void {
    this.usuarioService.delete(id).subscribe(() => {
      this.usuarioService.list().subscribe(data => {
        this.usuarioService.setList(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  getNombreRolPorId(idRol: number): string {
    const rolEncontrado = this.listaRoles.find(r => r.idRol === idRol);
    return rolEncontrado ? rolEncontrado.nombre : 'Rol no encontrado';
  }
}

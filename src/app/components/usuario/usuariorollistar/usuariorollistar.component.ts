import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CantidadUsuariosPorRolDTO } from '../../../models/CantidadUsuariosPorRolDTO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-usuariorollistar',
  imports: [CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginator,
    MatPaginatorModule],
  templateUrl: './usuariorollistar.component.html',
  styleUrl: './usuariorollistar.component.css'
})
export class UsuariorollistarComponent implements OnInit{

  displayedColumns: string[] = ['rol', 'cantidad'];
  dataSource: MatTableDataSource<CantidadUsuariosPorRolDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listRoles().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}

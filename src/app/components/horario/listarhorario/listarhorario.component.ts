import { Component, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HorarioService } from '../../../services/horario.service'
import { Horario } from '../../../models/horario'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'

@Component({
  selector: 'app-listarhorario',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './listarhorario.component.html',
  styleUrls: ['./listarhorario.component.css']
})
export class ListarhorarioComponent implements OnInit {
  dataSource:MatTableDataSource<Horario>=new MatTableDataSource()
  displayedColumns: string[] = ['idHorario', 'fecha', 'hora', 'nombreUsuario', 'disponible', 'editar', 'eliminar']

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.horarioService.list().subscribe(data => {
      this.horarioService.setList(data)
    })

    this.horarioService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  eliminar(id: number): void {
    this.horarioService.delete(id).subscribe(() => {
      this.horarioService.list().subscribe(data => {
        this.horarioService.setList(data)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
      })
    })
  }
}

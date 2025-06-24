import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Comentario } from '../../../models/comentario'
import { ComentarioService } from '../../../services/comentario.service'
import { MatButtonModule } from '@angular/material/button'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { RouterLink } from '@angular/router'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'

@Component({
  selector: 'app-listarcomentario',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatSortModule, MatPaginatorModule, RouterLink],
  templateUrl: './listarcomentario.component.html',
  styleUrls: ['./listarcomentario.component.css']
})
export class ListarcomentarioComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7']
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource()

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.comentarioService.list().subscribe(data => {
      const ordenado = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      this.comentarioService.setList(ordenado)
    })

    this.comentarioService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator

      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property === 'c4') return new Date(item.fecha)
        return (item as any)[property]
      }

      setTimeout(() => {
        if (this.sort) {
          this.dataSource.sort = this.sort
          this.sort.active = 'c4'
          this.sort.direction = 'desc'
          this.sort.sortChange.emit()
        }
      })
    })
  }

  eliminar(id: number): void {
    this.comentarioService.delete(id).subscribe(() => {
      this.comentarioService.list().subscribe(data => {
        const ordenado = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        this.comentarioService.setList(ordenado)
        this.dataSource = new MatTableDataSource(ordenado)
        this.dataSource.paginator = this.paginator

        this.dataSource.sortingDataAccessor = (item, property) => {
          if (property === 'c4') return new Date(item.fecha)
          return (item as any)[property]
        }

        setTimeout(() => {
          if (this.sort) {
            this.dataSource.sort = this.sort
            this.sort.active = 'c4'
            this.sort.direction = 'desc'
            this.sort.sortChange.emit()
          }
        })
      })
    })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { RouterLink } from '@angular/router'
import { RespuestaTest } from '../../../models/respuestatest'
import { RespuestaTestService } from '../../../services/respuestatest.service'

@Component({
  selector: 'app-listarrespuestatest',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterLink // ✅ correcto para standalone
  ],
  templateUrl: './listarrespuestatest.component.html',
  styleUrl: './listarrespuestatest.component.css'
})
export class ListarrespuestatestComponent implements OnInit {
  dataSource: MatTableDataSource<RespuestaTest> = new MatTableDataSource()
  displayedColumns: string[] = ['idRespuesta', 'respuesta', 'idPregunta', 'idUsuario', 'acciones']

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private respuestaTestService: RespuestaTestService) {}

  ngOnInit(): void {
    this.respuestaTestService.list().subscribe(data => {
      this.respuestaTestService.setList(data)
    })

    this.respuestaTestService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  eliminar(id: number): void {
    this.respuestaTestService.delete(id).subscribe(() => {
      this.respuestaTestService.list().subscribe(data => {
        this.respuestaTestService.setList(data)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
      })
    })
  }
}

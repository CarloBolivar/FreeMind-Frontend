import { Component, OnInit, ViewChild } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { RouterLink } from '@angular/router'
import { RecursoService } from '../../../services/recurso.service'
import { Recurso } from '../../../models/recurso'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'

@Component({
  selector: 'app-listarrecurso',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './listarrecurso.component.html',
  styleUrls: ['./listarrecurso.component.css']
})
export class ListarrecursoComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']
  dataSource: MatTableDataSource<Recurso> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator

  baseUrl: string = window.location.origin; // ejemplo: http://localhost:4200 o https://miapp.onrender.com

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.recursoService.list().subscribe(data => {
      this.recursoService.setList(data)
    })

    this.recursoService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  eliminar(id: number): void {
    this.recursoService.delete(id).subscribe(() => {
      this.recursoService.list().subscribe(data => {
        this.recursoService.setList(data)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
      })
    })
  }

  obtenerURL(element: Recurso): string {
    switch (element.tipo.toLowerCase()) {
      case 'audio':
        return `${this.baseUrl}/musica`;
      case 'imagen':
        return `${this.baseUrl}/imagenes`;
      case 'ia':
        return `${this.baseUrl}/chatbot`;
      default:
        return `${this.baseUrl}`;
    }
  }
}

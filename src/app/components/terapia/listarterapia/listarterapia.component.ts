import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
import { TerapiaService } from '../../../services/terapia.service'
import { Terapia } from '../../../models/terapia'
import { MatTableDataSource } from '@angular/material/table'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-listarterapia',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule
  ],
  templateUrl: './listarterapia.component.html',
  styleUrls: ['./listarterapia.component.css']
})
export class ListarterapiaComponent implements OnInit {
  dataSource: MatTableDataSource<Terapia> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private terapiaService: TerapiaService) {}

  ngOnInit(): void {
    this.terapiaService.list().subscribe(data => {
      this.terapiaService.setList(data)
    })

    this.terapiaService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  eliminar(id: number): void {
    this.terapiaService.delete(id).subscribe(() => {
      this.terapiaService.list().subscribe(data => {
        this.terapiaService.setList(data)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
      })
    })
  }
}

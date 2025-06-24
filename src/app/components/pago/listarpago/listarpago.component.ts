import { Component, OnInit, ViewChild } from '@angular/core'
import { Pago } from '../../../models/pago'
import { PagoService } from '../../../services/pago.service'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { RouterLink } from '@angular/router'
import { MatSortModule } from '@angular/material/sort'
import { MatButtonModule } from '@angular/material/button'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'

@Component({
  selector: 'app-listarpago',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './listarpago.component.html',
  styleUrls: ['./listarpago.component.css']
})
export class ListarpagoComponent implements OnInit {
  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12']
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.pagoService.list().subscribe(data => {
      this.pagoService.setList(data)
    })

    this.pagoService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  eliminar(id: number): void {
    this.pagoService.delete(id).subscribe(() => {
      this.pagoService.list().subscribe(data => {
        this.pagoService.setList(data)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
      })
    })
  }
}

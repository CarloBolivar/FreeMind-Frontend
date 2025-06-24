import { Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Rol } from '../../../models/rol'
import { RolService } from '../../../services/rol.service'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, MatPaginatorModule],
  templateUrl: './listarrol.component.html',
  styleUrls: ['./listarrol.component.css']
})
export class ListarrolComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4']
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.rolService.list().subscribe(data => {
      this.rolService.setList(data)
    })

    this.rolService.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  eliminar(id: number): void {
    this.rolService.delete(id).subscribe(() => {
      this.rolService.list().subscribe(data => {
        this.rolService.setList(data)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator
      })
    })
  }
}

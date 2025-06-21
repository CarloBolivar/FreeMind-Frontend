import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RecursoService } from '../../../services/recurso.service';
import { Recurso } from '../../../models/recurso';

@Component({
  selector: 'app-listarrecurso',
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listarrecurso.component.html',
  styleUrl: './listarrecurso.component.css'
})
export class ListarrecursoComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6'];
  
  dataSource:MatTableDataSource<Recurso>=new MatTableDataSource()
  constructor(private rS:RecursoService){}

  ngOnInit(): void {
      this.rS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

      this.rS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
  }

  eliminar(id:number){
    this.rS.delete(id).subscribe(data=>{
      this.rS.list().subscribe(data=>{
        this.rS.setList(data)
      })
    })
  }

}

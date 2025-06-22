import { Component, OnInit } from '@angular/core';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarpago',
  imports: [MatTableModule, MatButtonModule, MatSortModule, RouterLink],
  templateUrl: './listarpago.component.html',
  styleUrl: './listarpago.component.css'
})
export class ListarpagoComponent implements OnInit{
  displayedColumns: string[] = ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12'];
  dataSource:MatTableDataSource<Pago>=new MatTableDataSource()

  constructor(private pS:PagoService){}

  ngOnInit(): void {
    this.pS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.pS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }

  eliminar(id:number){
    return this.pS.deleteP(id).subscribe(data=>{
      this.pS.list().subscribe(data=>{
        this.pS.setList(data)
      })
    })
  }
}
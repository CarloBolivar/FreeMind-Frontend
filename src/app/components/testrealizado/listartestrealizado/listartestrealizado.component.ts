import { Component, OnInit } from '@angular/core';
import { Testrealizado } from '../../../models/testrealizado';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TestrealizadoService } from '../../../services/testrealizado.service';

@Component({
  selector: 'app-listartestrealizado',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './listartestrealizado.component.html',
  styleUrl: './listartestrealizado.component.css'
})
export class ListartestrealizadoComponent implements OnInit{
  displayedColumns: string[] = ['c1','c2','c3','c4','c5'];
  dataSource:MatTableDataSource<Testrealizado>=new MatTableDataSource()
  constructor(private trS:TestrealizadoService){}

  ngOnInit(): void {
      this.trS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
  }
}
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TestRealizado } from '../../../models/testrealizado';
import { TestrealizadoService } from '../../../services/testrealizado.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-listartestrealizado',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule,
    MatButtonModule,
    RouterLink,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './listartestrealizado.component.html',
  styleUrl: './listartestrealizado.component.css'
})
export class ListartestrealizadoComponent {
displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7'];
  
  dataSource:MatTableDataSource<TestRealizado>=new MatTableDataSource()
  constructor(private trS:TestrealizadoService){}

  ngOnInit(): void {
      this.trS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

      this.trS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
  }

  eliminar(id:number){
    this.trS.delete(id).subscribe(data=>{
      this.trS.list().subscribe(data=>{
        this.trS.setList(data)
      })
    })
  }
}

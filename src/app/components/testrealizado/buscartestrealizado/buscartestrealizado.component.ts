import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TestRealizado } from '../../../models/testrealizado';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TestrealizadoService } from '../../../services/testrealizado.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscartestrealizado',
  imports: [
    ReactiveFormsModule,
    MatTableModule, 
    MatInputModule,
  ],
  templateUrl: './buscartestrealizado.component.html',
  styleUrl: './buscartestrealizado.component.css'
})
export class BuscartestrealizadoComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource:MatTableDataSource<TestRealizado>=new MatTableDataSource()

  form:FormGroup;
  notResults:boolean=false
  testrealizadoBusqueda:number=0

  constructor(private trS:TestrealizadoService, private fb:FormBuilder){
    this.form=fb.group({
      testrealizado:['']
    })
  }

  ngOnInit(): void {
      this.trS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
      this.form.get('testrealizado')?.valueChanges.subscribe(value=>{
        this.testrealizadoBusqueda=value
        this.buscar()
      })
    }

    buscar() {
    if (this.testrealizadoBusqueda != 0) {
      this.trS.listId(this.testrealizadoBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]) 
        this.notResults = !data
      })
    } else {
      this.trS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.notResults = false
      }) 
  }
}
}

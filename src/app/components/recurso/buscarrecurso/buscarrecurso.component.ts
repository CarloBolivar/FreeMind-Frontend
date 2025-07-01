import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recurso } from '../../../models/recurso';
import { RecursoService } from '../../../services/recurso.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarrecurso',
  imports: [
    ReactiveFormsModule,
    MatTableModule, 
    MatInputModule,
  ],
  templateUrl: './buscarrecurso.component.html',
  styleUrl: './buscarrecurso.component.css'
})
export class BuscarrecursoComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource:MatTableDataSource<Recurso>=new MatTableDataSource()

  form:FormGroup;
  notResults:boolean=false
  recursoBusqueda:number=0

  constructor(private rS:RecursoService, private fb:FormBuilder){
    this.form=fb.group({
      recurso:['']
    })
  }

  ngOnInit(): void {
      this.rS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
      this.form.get('recurso')?.valueChanges.subscribe(value=>{
        this.recursoBusqueda=value
        this.buscar()
      })
    }

    buscar() {
  if (this.recursoBusqueda != 0) {
    this.rS.listId(this.recursoBusqueda).subscribe(data => {
      this.dataSource = new MatTableDataSource([data]) 
      this.notResults = !data
    })
  } else {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.notResults = false
    }) 
  }
}
}

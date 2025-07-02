import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarrol',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscarrol.component.html',
  styleUrls: ['./buscarrol.component.css']
})
export class BuscarrolComponent {
  displayedColumns: string[] = ['c1', 'c2'];
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  rolBusqueda: number = 0;

  constructor(private rolService: RolService, private fb: FormBuilder) {
    this.form = fb.group({
      rol: ['']
    });
  }

  ngOnInit(): void {
    this.rolService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('rol')?.valueChanges.subscribe(value => {
      this.rolBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.rolBusqueda != 0) {
      this.rolService.listId(this.rolBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.rolService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}

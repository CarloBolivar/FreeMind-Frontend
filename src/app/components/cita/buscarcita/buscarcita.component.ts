import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarcita',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscarcita.component.html',
  styleUrls: ['./buscarcita.component.css']
})
export class BuscarcitaComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  citaBusqueda: number = 0;

  constructor(private citaService: CitaService, private fb: FormBuilder) {
    this.form = fb.group({
      cita: ['']
    });
  }

  ngOnInit(): void {
    this.citaService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('cita')?.valueChanges.subscribe(value => {
      this.citaBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.citaBusqueda != 0) {
      this.citaService.listId(this.citaBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.citaService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}

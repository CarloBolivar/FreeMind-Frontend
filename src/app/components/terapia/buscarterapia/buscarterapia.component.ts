import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Terapia } from '../../../models/terapia';
import { TerapiaService } from '../../../services/terapia.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarterapia',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscarterapia.component.html',
  styleUrls: ['./buscarterapia.component.css']
})
export class BuscarterapiaComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  dataSource: MatTableDataSource<Terapia> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  terapiaBusqueda: number = 0;

  constructor(private terapiaService: TerapiaService, private fb: FormBuilder) {
    this.form = fb.group({
      terapia: ['']
    });
  }

  ngOnInit(): void {
    this.terapiaService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('terapia')?.valueChanges.subscribe(value => {
      this.terapiaBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.terapiaBusqueda != 0) {
      this.terapiaService.listId(this.terapiaBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.terapiaService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}

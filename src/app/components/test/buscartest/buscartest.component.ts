import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Test } from '../../../models/test';
import { TestService } from '../../../services/test.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscartest',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscartest.component.html',
  styleUrls: ['./buscartest.component.css']
})
export class BuscartestComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  dataSource: MatTableDataSource<Test> = new MatTableDataSource();
  form: FormGroup;
  notResults: boolean = false;
  testBusqueda: number = 0;

  constructor(private testService: TestService, private fb: FormBuilder) {
    this.form = fb.group({
      test: ['']
    });
  }

  ngOnInit(): void {
    this.testService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('test')?.valueChanges.subscribe(value => {
      this.testBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.testBusqueda != 0) {
      this.testService.listId(this.testBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource([data]);
        this.notResults = !data;
      });
    } else {
      this.testService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }
}

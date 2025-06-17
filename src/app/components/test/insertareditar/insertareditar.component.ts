import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { Test } from '../../../models/test';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditartest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditartestComponent implements OnInit {
  form: FormGroup;
  test: Test = new Test();
  edicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      codigo: [{ value: '', disabled: true }],
      titulo: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.edicion = !!id;
      if (this.edicion) {
        this.testService.listId(id).subscribe(data => {
          this.form.patchValue({
            codigo: data.idTest,
            titulo: data.titulo,
            descripcion: data.descripcion
          });
        });
      }
    });
  }

  aceptar(): void {
    this.test.titulo = this.form.value['titulo'];
    this.test.descripcion = this.form.value['descripcion'];

    if (this.edicion) {
      this.test.idTest = this.form.getRawValue()['codigo'];
      this.testService.update(this.test).subscribe(() => {
        this.router.navigate(['tests']);
      });
    } else {
      this.testService.insert(this.test).subscribe(() => {
        this.router.navigate(['tests']);
      });
    }
  }
}

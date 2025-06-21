import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TerapiaService } from '../../../services/terapia.service';
import { Terapia } from '../../../models/terapia';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarterapia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarterapiaComponent implements OnInit {
  form: FormGroup;
  terapia: Terapia = new Terapia();
  edicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private terapiaService: TerapiaService,
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
        this.terapiaService.listarPorId(id).subscribe(data => {
          this.form.patchValue({
            codigo: data.idTerapia,
            titulo: data.titulo,
            descripcion: data.descripcion
          });
        });
      }
    });
  }

  aceptar(): void {
    this.terapia.titulo = this.form.value['titulo'];
    this.terapia.descripcion = this.form.value['descripcion'];

    if (this.edicion) {
      this.terapia.idTerapia = this.form.getRawValue()['codigo'];
      this.terapiaService.modificar(this.terapia).subscribe(() => {
        this.router.navigate(['terapias']);
      });
    } else {
      this.terapiaService.insertar(this.terapia).subscribe(() => {
        this.router.navigate(['terapias']);
      });
    }
  }
}

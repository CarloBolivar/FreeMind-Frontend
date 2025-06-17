import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertareditarrol',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarrolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id']!= null
      this.init();
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required]
    })
  }

  aceptar(){
    if (this.form.valid) {
      this.rol.idRol = this.form.value.codigo
      this.rol.nombre = this.form.value.nombre

      if (this.edicion) {
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data);
          })
        })
      } else {
        this.rS.insert(this.rol).subscribe(() => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      }

      this.router.navigate(['roles']);
    }
  }

  init(){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRol),
          nombre: new FormControl(data.nombre, Validators.required)
        })
      })
    }
  }
}

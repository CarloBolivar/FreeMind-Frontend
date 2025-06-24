import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { Rol } from '../../../models/rol'
import { RolService } from '../../../services/rol.service'

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
  styleUrls: ['./insertareditar.component.css']
})
export class InsertareditarrolComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  rol: Rol = new Rol()

  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = this.id != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required]
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.codigo
      this.rol.nombre = this.form.value.nombre

      if (this.edicion) {
        this.rolService.update(this.rol).subscribe(() => {
          this.rolService.list().subscribe(data => {
            this.rolService.setList(data)
          })
        })
      } else {
        this.rolService.insert(this.rol).subscribe(() => {
          this.rolService.list().subscribe(data => {
            this.rolService.setList(data)
          })
        })
      }

      this.router.navigate(['roles'])
    }
  }

  init() {
    if (this.edicion) {
      this.rolService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRol),
          nombre: new FormControl(data.nombre, Validators.required)
        })
      })
    }
  }
}

import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

import { Terapia } from '../../../models/terapia'
import { TerapiaService } from '../../../services/terapia.service'

@Component({
  selector: 'app-insertareditarterapia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './insertareditar.component.html',
  styleUrls: ['./insertareditar.component.css']
})
export class InsertareditarterapiaComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  terapia: Terapia = new Terapia()

  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private terapiaService: TerapiaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.edicion = this.id != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      titulo: ['', Validators.required],
      descripcion: ['']
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.terapia.idTerapia = this.form.value.codigo
      this.terapia.titulo = this.form.value.titulo
      this.terapia.descripcion = this.form.value.descripcion

      if (this.edicion) {
        this.terapiaService.update(this.terapia).subscribe(() => {
          this.terapiaService.list().subscribe(data => {
            this.terapiaService.setList(data)
          })
        })
      } else {
        this.terapiaService.insert(this.terapia).subscribe(() => {
          this.terapiaService.list().subscribe(data => {
            this.terapiaService.setList(data)
          })
        })
      }

      this.router.navigate(['terapias'])
    }
  }

  init() {
    if (this.edicion) {
      this.terapiaService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTerapia),
          titulo: new FormControl(data.titulo, Validators.required),
          descripcion: new FormControl(data.descripcion)
        })
      })
    }
  }
}

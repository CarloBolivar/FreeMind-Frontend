import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

import { Test } from '../../../models/test'
import { TestService } from '../../../services/test.service'

@Component({
  selector: 'app-insertareditartest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './insertareditar.component.html',
  styleUrls: ['./insertareditar.component.css']
})
export class InsertareditartestComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  test: Test = new Test()

  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
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
      this.test.idTest = this.form.value.codigo
      this.test.titulo = this.form.value.titulo
      this.test.descripcion = this.form.value.descripcion

      if (this.edicion) {
        this.testService.update(this.test).subscribe(() => {
          this.testService.list().subscribe(data => {
            this.testService.setList(data)
          })
        })
      } else {
        this.testService.insert(this.test).subscribe(() => {
          this.testService.list().subscribe(data => {
            this.testService.setList(data)
          })
        })
      }

      this.router.navigate(['tests'])
    }
  }

  init() {
    if (this.edicion) {
      this.testService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTest),
          titulo: new FormControl(data.titulo, Validators.required),
          descripcion: new FormControl(data.descripcion)
        })
      })
    }
  }
}

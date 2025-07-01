import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatGridListModule } from '@angular/material/grid-list'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { provideNativeDateAdapter } from '@angular/material/core'

import { Recurso } from '../../../models/recurso'
import { Terapia } from '../../../models/terapia'
import { RecursoService } from '../../../services/recurso.service'
import { TerapiaService } from '../../../services/terapia.service'

@Component({
  selector: 'app-insertareditarrecurso',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatGridListModule
  ],
  templateUrl: './insertareditarrecurso.component.html',
  styleUrls: ['./insertareditarrecurso.component.css']
})
export class InsertareditarrecursoComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  recurso: Recurso = new Recurso()

  id: number = 0
  edicion: boolean = false

  listaTerapias: Terapia[] = []

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Imagen', viewValue: 'Imagen' },
    { value: 'Audio', viewValue: 'Audio' },
    { value: 'IA', viewValue: 'IA' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private recursoService: RecursoService,
    private terapiaService: TerapiaService,
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
      tipo: ['', Validators.required],
      url: ['', Validators.required],
      terapia: ['', Validators.required]
    })

    this.terapiaService.list().subscribe(data => {
      this.listaTerapias = data
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.recurso.idRecurso = this.form.value.codigo
      this.recurso.tipo = this.form.value.tipo
      this.recurso.url = this.form.value.url
      this.recurso.terapia.idTerapia = this.form.value.terapia

      if (this.edicion) {
        this.recursoService.update(this.recurso).subscribe(() => {
          this.recursoService.list().subscribe(data => {
            this.recursoService.setList(data)
          })
        })
      } else {
        this.recursoService.insert(this.recurso).subscribe(() => {
          this.recursoService.list().subscribe(data => {
            this.recursoService.setList(data)
          })
        })
      }

      this.router.navigate(['recursos'])
    }
  }

  init() {
    if (this.edicion) {
      this.recursoService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRecurso),
          tipo: new FormControl(data.tipo,Validators.required),
          url: new FormControl(data.url,Validators.required),
          terapia: new FormControl(data.terapia.idTerapia,Validators.required)
        })
      })
    }
  }
}

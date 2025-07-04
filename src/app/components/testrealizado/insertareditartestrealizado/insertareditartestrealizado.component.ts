import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { TestRealizado } from '../../../models/testrealizado'
import { Usuario } from '../../../models/usuario'
import { Test } from '../../../models/test'

import { TestrealizadoService } from '../../../services/testrealizado.service'
import { UsuarioService } from '../../../services/usuario.service'
import { TestService } from '../../../services/test.service'

@Component({
  selector: 'app-insertareditartestrealizado',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule 
  ],
  templateUrl: './insertareditartestrealizado.component.html',
  styleUrls: ['./insertareditartestrealizado.component.css']
})
export class InsertareditartestrealizadoComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  testRealizado: TestRealizado = new TestRealizado()

  id: number = 0
  edicion: boolean = false

  listaUsuarios: Usuario[] = []
  listaTests: Test[] = []

  constructor(
    private formBuilder: FormBuilder,
    private testrealizadoService: TestrealizadoService,
    private usuarioService: UsuarioService,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.edicion = params['id'] != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      fecha: ['', Validators.required],
      resultado: ['', Validators.required],
      usuario: ['', Validators.required],
      test: ['', Validators.required]
    })

    this.usuarioService.list().subscribe(data => {
      this.listaUsuarios = data.filter(u => u.idRol === 2);
    })

    this.testService.list().subscribe(data => {
      this.listaTests = data
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.testRealizado.idTestRealizado = this.form.value.codigo
      this.testRealizado.fecha = this.form.value.fecha
      this.testRealizado.resultado = this.form.value.resultado
      this.testRealizado.usuario.idUsuario = this.form.value.usuario
      this.testRealizado.test.idTest = this.form.value.test

      if (this.edicion) {
        this.testrealizadoService.update(this.testRealizado).subscribe(() => {
          this.testrealizadoService.list().subscribe(data => {
            this.testrealizadoService.setList(data)
          })
        })
      } else {
        this.testrealizadoService.insert(this.testRealizado).subscribe(() => {
          this.testrealizadoService.list().subscribe(data => {
            this.testrealizadoService.setList(data)
          })
        })
      }

      this.router.navigate(['testsrealizados'])
    }
  }

  init() {
    if (this.edicion) {
      this.testrealizadoService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTestRealizado),
          fecha: new FormControl(data.fecha,Validators.required),
          resultado: new FormControl(data.resultado,Validators.required),
          usuario: new FormControl(data.usuario.idUsuario,Validators.required),
          test: new FormControl(data.test.idTest,Validators.required)
        })
      })
    }
  }
}

import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Horario } from '../../../models/horario'
import { Usuario } from '../../../models/usuario'
import { HorarioService } from '../../../services/horario.service'
import { UsuarioService } from '../../../services/usuario.service'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatOptionModule } from '@angular/material/core'

@Component({
  selector: 'app-insertareditarhorario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: '../insertareditar/insertareditar.component.html',
  styleUrls: ['../insertareditar/insertareditar.component.css']
})
export class InsertareditarhorarioComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  horario: Horario = {} as Horario
  
  usuariosDisponibles: Usuario[] = []

  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private horarioService: HorarioService,
    private usuarioService: UsuarioService,
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
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      idUsuario: ['', Validators.required],
      disponible: [true, Validators.required]
    })

    this.usuarioService.list().subscribe(data => {
      this.usuariosDisponibles = data
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.horario.idHorario = this.edicion ? this.id : 0
      this.horario.fecha = this.form.value.fecha
      this.horario.hora = this.form.value.hora
      this.horario.idUsuario = this.form.value.idUsuario
      this.horario.disponible = this.form.value.disponible

      if (this.edicion) {
        this.horarioService.update(this.horario).subscribe(() => {
          this.horarioService.list().subscribe(data => {
            this.horarioService.setList(data)
          })
        })
      } else {
        this.horarioService.insert(this.horario).subscribe(() => {
          this.horarioService.list().subscribe(data => {
            this.horarioService.setList(data)
          })
        })
      }

      this.router.navigate(['horarios'])
    }
  }

  init() {
    if (this.edicion) {
      this.horarioService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          fecha: new FormControl(data.fecha),
          hora: new FormControl(data.hora),
          idUsuario: new FormControl(data.idUsuario),
          disponible: new FormControl(data.disponible)
        })
      })
    }
  }
}

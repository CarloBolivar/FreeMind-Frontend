import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { Usuario } from '../../../models/usuario'
import { Rol } from '../../../models/rol'
import { UsuarioService } from '../../../services/usuario.service'
import { RolService } from '../../../services/rol.service'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-insertareditarusuario',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrls: ['./insertareditar.component.css']
})
export class InsertareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()

  id: number = 0
  edicion: boolean = false

  listaRoles: Rol[] = []

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      dni: ['', Validators.required],
      especialidad: [''],
      credencial: [''],
      enabled: [true],
      idRol: ['', Validators.required]
    })

    this.rolService.list().subscribe(data => {
      this.listaRoles = data
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo
      this.usuario.nombre = this.form.value.nombre
      this.usuario.apellido = this.form.value.apellido
      this.usuario.correo = this.form.value.correo
      this.usuario.contrasena = this.form.value.contrasena
      this.usuario.dni = this.form.value.dni
      this.usuario.especialidad = this.form.value.especialidad
      this.usuario.credencial = this.form.value.credencial
      this.usuario.enabled = this.form.value.enabled
      this.usuario.idRol = this.form.value.idRol

      if (this.edicion) {
        this.usuarioService.update(this.usuario).subscribe(() => {
          this.usuarioService.list().subscribe(data => {
            this.usuarioService.setList(data)
          })
        })
      } else {
        this.usuarioService.insert(this.usuario).subscribe(() => {
          this.usuarioService.list().subscribe(data => {
            this.usuarioService.setList(data)
          })
        })
      }

      this.router.navigate(['usuarios'])
    }
  }

  init() {
    if (this.edicion) {
      this.usuarioService.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          nombre: new FormControl(data.nombre),
          apellido: new FormControl(data.apellido),
          correo: new FormControl(data.correo),
          contrasena: new FormControl(data.contrasena),
          dni: new FormControl(data.dni),
          especialidad: new FormControl(data.especialidad),
          credencial: new FormControl(data.credencial),
          enabled: new FormControl(data.enabled),
          idRol: new FormControl(data.idRol)
        })
      })
    }
  }
}

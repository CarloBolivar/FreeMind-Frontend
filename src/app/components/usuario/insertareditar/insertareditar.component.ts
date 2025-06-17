import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { UsuarioService } from '../../../services/usuario.service';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-insertareditarusuario',
  imports: [CommonModule,MatSelectModule,MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  usuario: Usuario = new Usuario()

  
  id: number = 0
  edicion: boolean = false
 
  //lista roles disponibles
  listaRoles: Rol[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private rS: RolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data ['id']!= null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
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

    //lista de roles disponibles
    this.rS.list().subscribe(data => {
    this.listaRoles = data;
    // console.log("roles disponibles:", this.listaRoles); 
    });

  }

  aceptar() {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo
      this.usuario.nombre = this.form.value.nombre
      this.usuario.apellido = this.form.value.apellido
      this.usuario.correo = this.form.value.correo
      this.usuario.contrasena = this.form.value.contrasena;
      this.usuario.dni = this.form.value.dni
      this.usuario.especialidad = this.form.value.especialidad
      this.usuario.credencial = this.form.value.credencial
      this.usuario.enabled = this.form.value.enabled;
      this.usuario.idRol = this.form.value.idRol;
      
      console.log('Usuario a actualizar:', this.usuario);
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      } else {
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      }
      this.router.navigate(['usuarios']);
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
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

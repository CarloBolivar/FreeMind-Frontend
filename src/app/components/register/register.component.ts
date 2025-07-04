import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { Usuario } from '../../models/usuario';
import { Rol } from '../../models/rol';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaRoles: Rol[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    public router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      dni: ['', Validators.required],
      idRol: ['', Validators.required]
    });

    this.rolService.list().subscribe(data => {
      this.listaRoles = data;
    });
  }

  registrar() {
    if (this.form.valid) {
      const nuevoUsuario: Usuario = this.form.value;
      nuevoUsuario.enabled = true;

      this.usuarioService.insert(nuevoUsuario).subscribe(() => {
        this.usuarioService.list().subscribe(data => {
          this.usuarioService.setList(data);
          this.router.navigate(['login']);
        });
      });
    }
  }

  goToHome() {
    window.location.href = environment.baseFrontend;
  }
}

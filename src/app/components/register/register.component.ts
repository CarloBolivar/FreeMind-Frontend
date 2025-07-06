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
  registroFallido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    public router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      dni: ['', Validators.required],
      rol: [null, Validators.required]
    });

    this.rolService.listPublicos().subscribe({
      next: (data) => {
        this.listaRoles = data;
      },
      error: () => {
        this.registroFallido = true;
      }
    });
  }

  registrar() {
    if (this.form.valid) {
      const usuario: Usuario = this.form.value;
      usuario.enabled = true;

      this.usuarioService.insertPublic(usuario).subscribe({
        next: () => this.router.navigate(['login']),
        error: () => {
          this.registroFallido = true;
        }
      });
    }
  }

  goToHome() {
    window.location.href = environment.baseFrontend;
  }
}

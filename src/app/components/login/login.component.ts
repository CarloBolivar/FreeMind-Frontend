import { Component, OnInit } from '@angular/core';
import { JwtRequest } from '../../models/jwtRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../../environment/environment';
import { JwtResponse } from '../../models/jwtResponse';
import { AuthService } from '../../services/auth.service'; 

const base_url = environment.base;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private loginService: LoginService,
    public router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      console.log("🔐 Ya hay sesión activa, redirigiendo a dashboard...");
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    let request = new JwtRequest();
    request.correo = this.correo;
    request.contrasena = this.password;

    this.loginService.login(request).subscribe(
      (data: JwtResponse) => {
        localStorage.setItem('token', data.token); 
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('nombre', data.nombreUsuario);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }

  goToHome() {
    window.location.href = environment.baseFrontend;
  }
}

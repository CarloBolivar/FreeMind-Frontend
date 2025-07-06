import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';
import { environment } from '../../environment/environment';
import { JwtResponse } from '../models/jwtResponse';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
  return this.http.post<JwtResponse>(`${base_url}/login`, request);
}


  verificar() {
    let token = localStorage.getItem('token');
    return token != null;
  }

  showRole(): string | null {
  return localStorage.getItem('rol');
  }

  getNombreUsuario(): string | null {
  return localStorage.getItem('nombre');
  }

  obtenerRol(): string {
  return localStorage.getItem('rol') || '';
}
  
}

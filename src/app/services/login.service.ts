import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';
import { environment } from '../../environment/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post(`${base_url}/login`, request);
  }

  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

  
}

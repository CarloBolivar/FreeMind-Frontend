import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }

  getNombre(): string {
    return localStorage.getItem('nombre') || '';
  }

  getRol(): string {
    return localStorage.getItem('rol') || '';
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}

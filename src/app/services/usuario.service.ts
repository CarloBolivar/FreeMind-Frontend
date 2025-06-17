import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = 'http://localhost:8081/usuarios';
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  insert(usuario: Usuario): Observable<void> {
    return this.http.post<void>(this.url, usuario);
  }

  update(usuario: Usuario): Observable<void> {
    return this.http.put<void>(this.url, usuario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(lista: Usuario[]) {
    this.listaCambio.next(lista);
  }
}

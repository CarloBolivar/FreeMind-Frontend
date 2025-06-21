import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { Subject } from 'rxjs';
import { environment } from '../../environment/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Rol[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Rol[]>(this.url)
  }

  insert(rol: Rol) {
    return this.http.post<void>(this.url, rol)
  }

  update(rol: Rol) {
    return this.http.put<void>(this.url, rol)
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  setList(lista: Rol[]) {
    this.listaCambio.next(lista)
  }
}

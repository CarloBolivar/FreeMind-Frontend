import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { Observable,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url: string = 'http://localhost:8081/roles';
  private listaCambio = new Subject<Rol[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.url);
  }

  insert(rol: Rol): Observable<void> {
    return this.http.post<void>(this.url, rol);
  }

  update(rol: Rol): Observable<void> {
    return this.http.put<void>(this.url, rol);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listId(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }
  getList() {
  return this.listaCambio.asObservable();
  }
  setList(lista: Rol[]) {
  this.listaCambio.next(lista);
  }
}

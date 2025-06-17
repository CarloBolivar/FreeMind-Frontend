import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cita } from '../models/cita';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private url: string = 'http://localhost:8080/citas';
  private listaCambio = new Subject<Cita[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.url);
  }

  insert(cita: Cita): Observable<void> {
    return this.http.post<void>(this.url, cita);
  }

  update(cita: Cita): Observable<void> {
    return this.http.put<void>(this.url, cita);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listId(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(lista: Cita[]) {
    this.listaCambio.next(lista);
  }
}

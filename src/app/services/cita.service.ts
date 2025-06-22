import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cita } from '../models/cita';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private baseUrl = 'http://localhost:8081/citas';

  constructor(private http: HttpClient) {}

  list(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.baseUrl);
  }

  insert(cita: Cita): Observable<void> {
    return this.http.post<void>(this.baseUrl, cita);
  }

  update(cita: Cita): Observable<void> {
    return this.http.put<void>(this.baseUrl, cita);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  listId(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.baseUrl}/${id}`);
  }
}

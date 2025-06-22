import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terapia } from '../models/terapia';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TerapiaService {
  private url = `${base_url}/terapias`;
  private listaCambio = new Subject<Terapia[]>();

  constructor(private http: HttpClient) {}

  // Alias para compatibilidad con el componente de cita
  list(): Observable<Terapia[]> {
    return this.http.get<Terapia[]>(this.url);
  }

  listar(): Observable<Terapia[]> {
    return this.http.get<Terapia[]>(this.url);
  }

  insertar(terapia: Terapia): Observable<void> {
    return this.http.post<void>(this.url, terapia);
  }

  modificar(terapia: Terapia): Observable<void> {
    return this.http.put<void>(this.url, terapia);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listarPorId(id: number): Observable<Terapia> {
    return this.http.get<Terapia>(`${this.url}/${id}`);
  }

  getLista(): Observable<Terapia[]> {
    return this.listaCambio.asObservable();
  }

  setLista(listaNueva: Terapia[]): void {
    this.listaCambio.next(listaNueva);
  }
}

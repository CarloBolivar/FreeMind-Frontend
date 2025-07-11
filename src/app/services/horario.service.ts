import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Horario } from '../models/horario';
import { environment } from '../../environment/environment';
import { CantidadHorariosDisponiblesPorPsicologoDTO } from '../models/CantidadHorariosDisponiblesPorPsicologoDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private url = `${base_url}/horarios`;
  private listaCambio = new Subject<Horario[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Horario[]>(this.url);
  }

  insert(horario: Horario) {
    return this.http.post(this.url, horario);
  }

  update(horario: Horario) {
    return this.http.put(this.url, horario);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Horario>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Horario[]) {
    this.listaCambio.next(listaNueva);
  }

  listAvailableByPsicologo(id: number): Observable<Horario[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Horario[]>(`${this.url}/disponibles/${id}`, { headers });
  }

  listAllDisponibles(): Observable<Horario[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  return this.http.get<Horario[]>(`${this.url}/disponibles`, { headers });
  }

  obtenerDisponiblesPorPsicologo(idPsicologo: number) {
    return this.http.get<CantidadHorariosDisponiblesPorPsicologoDTO[]>(`${this.url}/disponibles/${idPsicologo}`);
  }
}

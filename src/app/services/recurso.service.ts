import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Recurso } from '../models/recurso';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private url = `${base_url}/recursos`;
  private listaCambio = new Subject<Recurso[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Recurso[]>(this.url);
  }

  insert(recurso: Recurso) {
    return this.http.post(this.url, recurso);
  }

  update(recurso: Recurso) {
    return this.http.put(this.url, recurso);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Recurso>(`${this.url}/${id}`);
  }

  setList(listaNueva: Recurso[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}

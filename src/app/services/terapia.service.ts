import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terapia } from '../models/terapia';
import { Subject } from 'rxjs';
import { environment } from '../../environment/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TerapiaService {
  private url = `${base_url}/terapias`;
  private listaCambio = new Subject<Terapia[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Terapia[]>(this.url);
  }

  insert(terapia: Terapia) {
    return this.http.post(this.url, terapia);
  }

  update(terapia: Terapia) {
    return this.http.put(this.url, terapia);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Terapia>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Terapia[]) {
    this.listaCambio.next(listaNueva);
  }
}

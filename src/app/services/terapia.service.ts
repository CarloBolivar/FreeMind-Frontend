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

  listar() {
    return this.http.get<Terapia[]>(this.url)
  }

  insertar(terapia: Terapia) {
    return this.http.post<void>(this.url, terapia)
  }

  modificar(terapia: Terapia) {
    return this.http.put<void>(this.url, terapia)
  }

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

  listarPorId(id: number) {
    return this.http.get<Terapia>(`${this.url}/${id}`)
  }

  getLista() {
    return this.listaCambio.asObservable()
  }

  setLista(listaNueva: Terapia[]) {
    this.listaCambio.next(listaNueva)
  }

}

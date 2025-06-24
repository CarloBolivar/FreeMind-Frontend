import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Cita } from '../models/cita'
import { environment } from '../../environment/environment'
import { BehaviorSubject } from 'rxjs'

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private url = `${base_url}/citas`
  private listaCambio = new BehaviorSubject<Cita[]>([])

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Cita[]>(this.url)
  }

  insert(cita: Cita) {
    return this.http.post(this.url, cita)
  }

  update(cita: Cita) {
    return this.http.put(this.url, cita)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  listId(id: number) {
    return this.http.get<Cita>(`${this.url}/${id}`)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  setList(lista: Cita[]) {
    this.listaCambio.next(lista)
  }
}

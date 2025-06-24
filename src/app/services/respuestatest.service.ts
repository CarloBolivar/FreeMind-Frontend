import { Injectable } from '@angular/core'
import { environment } from '../../environment/environment'
import { HttpClient } from '@angular/common/http'
import { RespuestaTest } from '../models/respuestatest'
import { Subject } from 'rxjs'

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class RespuestaTestService {
  private url = `${base_url}/respuestas`
  private listaCambio = new Subject<RespuestaTest[]>()

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<RespuestaTest[]>(this.url)
  }

  insert(r: RespuestaTest) {
    return this.http.post(this.url, r)
  }

  setList(listaNueva: RespuestaTest[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<RespuestaTest>(`${this.url}/${id}`)
  }

  update(r: RespuestaTest) {
    return this.http.put(this.url, r)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
}

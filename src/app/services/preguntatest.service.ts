import { Injectable } from '@angular/core'
import { environment } from '../../environment/environment'
import { HttpClient } from '@angular/common/http'
import { PreguntaTest } from '../models/preguntatest'
import { Subject } from 'rxjs'

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PreguntaTestService {
  private url = `${base_url}/preguntas`
  private listaCambio = new Subject<PreguntaTest[]>()

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<PreguntaTest[]>(this.url)
  }

  insert(p: PreguntaTest) {
    return this.http.post(this.url, p)
  }

  setList(listaNueva: PreguntaTest[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<PreguntaTest>(`${this.url}/${id}`)
  }

  update(p: PreguntaTest) {
    return this.http.put(this.url, p)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }
}

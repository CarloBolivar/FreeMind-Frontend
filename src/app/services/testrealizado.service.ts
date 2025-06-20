import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { TestRealizado } from '../models/testrealizado';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TestrealizadoService {

  private url = `${base_url}/tests-realizados`;
  private listaCambio = new Subject<TestRealizado[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<TestRealizado[]>(this.url);
  }

  insert(testRealizado: TestRealizado) {
    return this.http.post(`${this.url}`, testRealizado);
  }

  setList(lista: TestRealizado[]) {
    this.listaCambio.next(lista);
  }
  
  getList() {
    return this.listaCambio.asObservable();
  }
  update(testRealizado: TestRealizado) {
    return this.http.put<void>(this.url, testRealizado);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<TestRealizado>(`${this.url}/${id}`);
  }
}

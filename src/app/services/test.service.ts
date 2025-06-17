import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from '../models/test';
import { Subject } from 'rxjs';
import { environment } from '../../environment/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private url = `${base_url}/tests`;
  private listaCambio = new Subject<Test[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Test[]>(this.url);
  }

  insert(test: Test) {
    return this.http.post<void>(this.url, test);
  }

  update(test: Test) {
    return this.http.put<void>(this.url, test);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Test>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(lista: Test[]) {
    this.listaCambio.next(lista);
  }
}

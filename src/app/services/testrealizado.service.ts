import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Testrealizado } from '../models/testrealizado';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TestrealizadoService {

  private url = `${base_url}/tests-realizados`;

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Testrealizado[]>(`${this.url}`)
  }
}

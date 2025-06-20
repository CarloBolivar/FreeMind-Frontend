import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url = `${base_url}/comentarios`;

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Comentario[]>(`${this.url}`)
  }
}
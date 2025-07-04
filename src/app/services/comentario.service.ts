import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario';
import { Subject } from 'rxjs';
import { CantidadComentariosPorUsuarioDTO } from '../models/cantidadcomentariosporusuarioDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url = `${base_url}/comentarios`;
  private listaCambio = new Subject<Comentario[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comentario[]>(this.url);
  }

  insert(c: Comentario) {
    return this.http.post(this.url, c);
  }

  update(comentario: Comentario) {
    return this.http.put(this.url, comentario);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Comentario>(`${this.url}/${id}`);
  }

  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  cantidadComentariosPorUsuario() {
  return this.http.get<CantidadComentariosPorUsuarioDTO[]>(`${this.url}/cantidad-comentarios-por-usuario`);
}

}

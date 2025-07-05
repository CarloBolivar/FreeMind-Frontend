import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';
import { environment } from '../../environment/environment';
import { map } from 'rxjs/operators';
import { CantidadUsuariosPorRolDTO } from '../models/CantidadUsuariosPorRolDTO';
import { CantidadSumaPagoDTO } from '../models/CantidadSumaPagoDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(this.url);
  }

  insert(usuario: Usuario) {
    return this.http.post<void>(this.url, usuario);
  }

  update(usuario: Usuario) {
    return this.http.put<void>(this.url, usuario);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(lista: Usuario[]) {
    this.listaCambio.next(lista);
  }

  listPacientes() {
  return this.list().pipe(
    map((usuarios: Usuario[]) => usuarios.filter(u => u.idRol === 2)) // ID del rol PACIENTE // Citas
  );
}

  listPsicologos() {
  return this.list().pipe(
    map((usuarios: Usuario[]) => usuarios.filter(u => u.idRol === 3)) // ID del rol PSICÓLOGO // Citas
  );
}
  listRoles() {
  return this.http.get<CantidadUsuariosPorRolDTO[]>(`${this.url}/roles`);
}

listMontoTotalPorUsuario() {
  return this.http.get<CantidadSumaPagoDTO[]>(`${this.url}/montos`);
}

filtrarUsuarios(queryParams: string) {
  return this.http.get<Usuario[]>(`${this.url}/filtro${queryParams}`);
}

obtenerPorCorreo(correo: string) {
  return this.http.get<Usuario>(`${this.url}/correo/${correo}`);
}


}

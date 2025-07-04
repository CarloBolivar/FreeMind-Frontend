import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../models/pago';
import { Subject } from 'rxjs';
import { CantidadMontoPorTipoDeTerapiaDTO } from '../models/cantidadmontoportipodeterapiaDTO';
import { CantidadSumaPagosPorMesDTO } from '../models/cantidadsumapagospormesDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = `${base_url}/pagos`;
  private listaCambio = new Subject<Pago[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Pago[]>(this.url);
  }

  insert(pago: Pago) {
    return this.http.post(this.url, pago);
  }

  update(pago: Pago) {
    return this.http.put(this.url, pago);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Pago>(`${this.url}/${id}`);
  }

  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  obtenerMontoPorTipoDeTerapia() {
  return this.http.get<CantidadMontoPorTipoDeTerapiaDTO[]>(`${this.url}/monto-total-por-tipo-de-terapia`);
}

  obtenerSumaPagosPorMes() {
  return this.http.get<CantidadSumaPagosPorMesDTO[]>(`${this.url}/suma-pagos-por-mes`);
  }
}

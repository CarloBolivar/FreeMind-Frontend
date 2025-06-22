import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../models/pago';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url=`${base_url}/pagos`

  private listaCambio=new Subject<Pago[]>()

  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Pago[]>(this.url)
  }

  insert(p:Pago){
    return this.http.post(`${this.url}`,p)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  setList(listaNueva:Pago[]){
    this.listaCambio.next(listaNueva)
  }

  listId(id:number){
    return this.http.get<Pago>(`${this.url}/${id}`)
  }

  update(p:Pago){
    return this.http.put(this.url,p)
  }

  deleteP(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiKey = '51027130-695a90b55592ce6c55044cf87';
  private apiUrl = 'https://pixabay.com/api/';
  private listaCambio = new Subject<Image>();

  constructor(private http: HttpClient) {}

  obtenerImagen() {
  const url = `https://pixabay.com/api/?key=${this.apiKey}&q=calm+landscape&image_type=photo&per_page=10&order=latest&category=nature`;

  return this.http.get<any>(url);
  }

  getImagen() {
    return this.listaCambio.asObservable();
  }

  setImagen(imagen: Image) {
    this.listaCambio.next(imagen);
  }
}

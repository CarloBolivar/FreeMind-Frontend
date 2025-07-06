import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Music } from '../models/music';


@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly API_URL = 'https://freesound.org/apiv2/search/text/';
  private readonly TOKEN = 'ViJkZCpmBMSKT0NZu4Svlx8nA1Yy5Y0cuH7vQEXo';
  private listaCambio = new Subject<Music[]>();

  constructor(private http: HttpClient) {}

getList(): Observable<Music[]> {
  const params = {
    query: 'relaxing music',
    fields: 'name,previews,duration',
    page_size: '20'
  };

  const headers = {
    Authorization: 'Token ' + this.TOKEN
  };

  return this.http.get<any>(this.API_URL, { params, headers }).pipe(
    map(res =>
      res.results
        ?.filter((s: any) => s.previews?.['preview-lq-mp3'])
        .map((s: any) => ({
          name: s.name,
          previewUrl: s.previews['preview-lq-mp3'],
          duration: s.duration
        })) || []
    )
  );
}


  setList(lista: Music[]) {
    this.listaCambio.next(lista);
  }

  getListStream() {
    return this.listaCambio.asObservable();
  }
}

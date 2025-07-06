import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MusicService } from '../../../services/music.service';
import { Music } from '../../../models/music';

@Component({
  selector: 'app-apimusica',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSliderModule
  ],
  templateUrl: './apimusica.component.html',
  styleUrls: ['./apimusica.component.css']
})
export class ApimusicaComponent implements OnInit, OnDestroy {
  lista: Music[] = [];
  audio!: HTMLAudioElement;
  reproduciendo = false;
  actual: string = '';
  volumen: number = 0.2;

  constructor(
    private musicService: MusicService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.musicService.getList().subscribe({
        next: data => {
          if (data && data.length > 0) {
            this.musicService.setList(data);
            const randomMusic = data[Math.floor(Math.random() * data.length)];
            this.prepareAudio(randomMusic);
          }
        }
      });

      this.musicService.getListStream().subscribe(data => {
        this.lista = data;
      });
    }
  }

  prepareAudio(m: Music): void {
    if (!m || !m.previewUrl) return;
    if (this.audio) this.audio.pause();

    this.audio = new Audio(m.previewUrl);
    this.audio.volume = this.volumen;
    this.reproduciendo = false;
    this.actual = m.name;
  }

  play(m: Music): void {
    this.prepareAudio(m);
    this.audio.play().then(() => {
      this.reproduciendo = true;
    }).catch(() => {});
  }

  toggle(): void {
    if (isPlatformBrowser(this.platformId) && this.audio) {
      if (this.reproduciendo) {
        this.audio.pause();
      } else {
        this.audio.play().catch(() => {});
      }
      this.reproduciendo = !this.reproduciendo;
    }
  }

  getAnother(): void {
    if (this.lista.length === 0) return;

    const random = Math.floor(Math.random() * this.lista.length);
    const nueva = this.lista[random];
    this.prepareAudio(nueva);
    this.audio.play().then(() => {
      this.reproduciendo = true;
    }).catch(() => {});
  }

  cambiarVolumen(valor: number): void {
    this.volumen = valor;
    if (this.audio) this.audio.volume = valor;
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.audio) {
      this.audio.pause();
      this.reproduciendo = false;
    }
  }
}

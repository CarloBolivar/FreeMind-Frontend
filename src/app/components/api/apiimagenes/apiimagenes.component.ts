import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageService } from '../../../services/image.service';
import { Image } from '../../../models/image';

@Component({
  selector: 'app-apiimagenes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './apiimagenes.component.html',
  styleUrls: ['./apiimagenes.component.css']
})
export class ApiimagenesComponent implements OnInit {
  imagen: Image = new Image();
  cargando: boolean = false;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.cargarImagen();
  }

  cargarImagen(): void {
    this.cargando = true;
    this.imageService.obtenerImagen().subscribe({
      next: (res) => {
        if (res.hits.length > 0) {
          const index = Math.floor(Math.random() * res.hits.length);
          const img = res.hits[index];
          this.imagen = {
            largeImageURL: img.largeImageURL,
            tags: img.tags
          };
          this.imageService.setImagen(this.imagen);
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar imagen de Pixabay:', err);
        alert('No se pudo cargar la imagen. Intente más tarde.');
        this.cargando = false;
      }
    });
  }
}

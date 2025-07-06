import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombreUsuario: string = '';
  rol: string = '';

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre') || 'Usuario';
    this.rol = localStorage.getItem('rol') || '';
  }
}

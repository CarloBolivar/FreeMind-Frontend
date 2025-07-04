import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HorarioService } from '../../../services/horario.service';
import { Horario } from '../../../models/horario';

@Component({
  selector: 'app-reportecantidadhorariosdisponibles',
  standalone: true,
  templateUrl: './reportecantidadhorariosdisponibles.component.html',
  styleUrls: ['./reportecantidadhorariosdisponibles.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class ReportecantidadhorariosdisponiblesComponent implements OnInit {
  horariosDisponibles: Horario[] = [];
  idPsicologo: number = 0;

  constructor(private route: ActivatedRoute, private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idPsicologo = +params['idPsicologo'];
      this.horarioService.listAvailableByPsicologo(this.idPsicologo).subscribe(data => {
        this.horariosDisponibles = data;
      });
    });
  }
}

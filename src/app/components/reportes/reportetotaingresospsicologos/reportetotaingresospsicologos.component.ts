import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CitaService } from '../../../services/cita.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportetotaingresospsicologos',
  imports: [NgChartsModule,CommonModule],
  templateUrl: './reportetotaingresospsicologos.component.html',
  styleUrl: './reportetotaingresospsicologos.component.css'
})
export class ReportetotaingresospsicologosComponent implements OnInit{
  barChartOptions :ChartOptions={
    responsive : true
  }
  barChartLabels : string[]=[]
  barChartType :ChartType= 'doughnut'
  barChartLegend=true
  barChartData:ChartDataset[]=[]

  noData: boolean = false;

  constructor(private cS:CitaService){}

 ngOnInit(): void {

   this.cS.getingresos().subscribe(data=>{
    //verifica si no hay data
    if (!data || data.length === 0) {
        this.noData = true;
        return;
      }

    this.barChartLabels=data.map(item=>item.nombre)

    this.barChartData=[
     {
      data:data.map(item=>item.totalIngresos),
      label:'Total de ingresos por psicologo',
      backgroundColor:[
        '#050504',
        '#C2CEDB',
        '#3F51B5',
        '#E5E9F2',
        '#1F2D3D',
        '#D3DCE6',
      ],
   
      borderWidth:1
     }    

    ]

   })
 }
}


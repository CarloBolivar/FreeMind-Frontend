import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-reportetotaingresospsicologos',
  imports: [NgChartsModule],
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

  constructor(private cS:CitaService){}

 ngOnInit(): void {

   this.cS.getingresos().subscribe(data=>{

    this.barChartLabels=data.map(item=>item.nombre)

    this.barChartData=[
     {
      data:data.map(item=>item.totalIngresos),
      label:'Total de ingresos por psicologo',
      backgroundColor:[
        '#468284',
        '#62B6CB',
        '#1B4965',
        '#CAE9FF',
        '#5FA8D3'
      ],
   
      borderWidth:1
     }    

    ]

   })

 }
}


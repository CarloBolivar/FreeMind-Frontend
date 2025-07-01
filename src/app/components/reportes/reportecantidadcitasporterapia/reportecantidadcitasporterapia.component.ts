import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CitaService } from '../../../services/cita.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  standalone: true,
  selector: 'app-reportecantidadcitasporterapia',
  imports: [NgChartsModule],
  templateUrl: './reportecantidadcitasporterapia.component.html',
  styleUrl: './reportecantidadcitasporterapia.component.css'
})
export class ReportecantidadcitasporterapiaComponent implements OnInit{
  barChartOptions :ChartOptions={
    responsive : true
  }
  barChartLabels : string[]=[]
  barChartType :ChartType= 'pie'
  barChartLegend=true
  barChartData:ChartDataset[]=[]

  constructor(private cS:CitaService){}

 ngOnInit(): void {

   this.cS.getQuantity().subscribe(data=>{

    this.barChartLabels=data.map(item=>item.nameTerapia)

    this.barChartData=[
     {
      data:data.map(item=>item.quantityCitas),
      label:'Cantidad de citas por terapia',
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


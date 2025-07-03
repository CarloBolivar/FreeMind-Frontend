import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CitaService } from '../../../services/cita.service';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-reportecantidadcitasporterapia',
  imports: [NgChartsModule,CommonModule],
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

  noData: boolean = false;

  constructor(private cS:CitaService){}

 ngOnInit(): void {

   this.cS.getQuantity().subscribe(data=>{
    //verifica si no hay data
    if (!data || data.length === 0) {
        this.noData = true;
        return;
      } 

    this.barChartLabels=data.map(item=>item.nameTerapia)

    this.barChartData=[
     {
      data:data.map(item=>item.quantityCitas),
      label:'Cantidad de citas por terapia',
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


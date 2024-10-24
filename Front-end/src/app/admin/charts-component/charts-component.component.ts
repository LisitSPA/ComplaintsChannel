import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-charts-component',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts-component.component.html',
  styleUrls: ['./charts-component.component.css'],
})
export class ChartsAdmin implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  public barChartData: ChartData<'bar'> = {
    labels: [], 
    datasets: [
      { data: [], label: 'Denuncias por Área' },  
    ],
  };

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],  
    datasets: [{ data: [] }], 
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 0, 
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType = 'bar' as const;

  public doughnutChartType: 'doughnut' = 'doughnut';
 
  constructor(
    private dashboardService: DashboardService
  ) {}


  ngOnInit(): void {
    this.loadChartData();
    this.loadDoughnutChartData();
  }
  
  loadChartData() {
    this.dashboardService.getChartByArea().subscribe(
      res => {

        let labels = res.content.map((x : any) => (x.name ));
        let data = res.content.map((x : any) => ( x.total ))

        this.barChartData = {
          labels: labels, 
          datasets: [
            { data: data, label: 'Denuncias por Área' },  
          ],
        };
         
      }
    )
  }

  loadDoughnutChartData(){
    this.dashboardService.getChartByPosition().subscribe(
      res => {
      
        let labels = res.content.map((x : any) => (x.name ));
        let data = res.content.map((x : any) => ( x.total ))

        this.doughnutChartData = {
          labels: labels,  
          datasets: [{ data: data }], 
        };
      }
    )

    
  }


}

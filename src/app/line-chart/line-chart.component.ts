import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stock-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {


  @Input() lineChartData;
  @Input() lineChartLabels;
  @Input() lineChartColors;
  @Input() lineChartLegend;
  @Input() lineChartType;
  @Input() lineChartPlugins;
  constructor() { }

  ngOnInit() {
  }

}

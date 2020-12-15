import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stock-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {


  @Input() public lineChartData;
  @Input() public lineChartLabels;
  @Input() public lineChartColors;
  @Input() public lineChartLegend;
  @Input() public lineChartType;
  @Input() public lineChartPlugins;
  constructor() { }

  public ngOnInit() {
  }

}

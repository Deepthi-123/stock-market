// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private http: HttpClient) {}
  // name = 'Angular 5';
  public name = 'Angular ' + VERSION.major;
  public stockSelected = false;
  public currentSelection = '';
  public stockData: String[];
  public data: string;
  public weeklyData: number[] = [];
  public weekDates: { date: string; stockValue: string }[] = [];
  public lineChartData: ChartDataSets[] = [{ data: [], label: '' }];
  public stockCharts: ChartDataSets[] = [{ data: [], label: '' }];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(204, 204, 255, 0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  public stocksList: {name: string; code: string}[] = [
    {name: 'Biocon', code: 'BIOCON'},
    {name: 'Canara Bank', code: 'CANBK'},
    {name: 'Ashok Leyland', code: '500477'},
    {name: 'Tata Steel', code: 'TATASTEEL'},
    {name: 'Glenmark Pharmaceuticals', code: '532296'},
    {name: 'HDFC Life', code: '540777'},
    
  ];

  public configUrl = '';
  ngOnInit(): void {}

  public onStockSelection(type: {name: string; code: string}) {
    // this.lineChartData[0].data = [];
    // this.lineChartData[0].label = type;
    this.lineChartLabels = [];
    this.stockCharts[0].data = [];
    this.getStockUrl(type.code);
    if (
      document.activeElement &&
      document.activeElement instanceof HTMLButtonElement
    ) {
      document.activeElement.blur();
    }
    if (this.lineChartData.filter((entry) => entry.label === type.name).length > 0) {
      this.weekDates.map((entry) => this.lineChartLabels.push(entry.date));
      // this.weekDates.map((x, i) => {return {'stockValue': this.stockCharts[0].data[i]}});
      this.stockCharts[0].data = this.lineChartData.find(
        (entry) => entry.label === type.name
      ).data;
      
      this.stockCharts[0].label = this.lineChartData.find(
        (entry) => entry.label === type.name
      ).label;
      this.weekDates.map((entry, i) => entry.stockValue = this.stockCharts[0].data[i].toString());
      console.log(this.weekDates);

      //  console.log(this.lineChartData);
    } else {
      this.displayWeeklyUpdates().then((result) => {
        this.data = result['Time Series (Daily)'];
        this.IsStockSelected();
        this.weekDates.map((entry) =>
          this.weeklyData.push(Number(entry.stockValue))
        );
        this.weekDates.map((entry) => this.lineChartLabels.push(entry.date));
        this.stockCharts[0].data = this.weeklyData;
        this.stockCharts[0].label = type.name;
        this.lineChartData.push({ data: this.weeklyData, label: type.name });
        // console.log(this.weekDates);
      });
    }
    // console.log(this.stockCharts[0]);
  }

  public displayWeeklyUpdates() {
    const today = moment().format('YYYY-MM-DD');
    const aWeekBefore = moment().subtract(1, 'week').format('YYYY-MM-DD');
    // console.log(aWeekBefore);
    return this.http.get(this.configUrl).toPromise();
  }

  public getStockUrl(urlFragment: string): void {
    this.configUrl =
      'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:' +
      urlFragment +
      '&apikey=8RQQ07SRZ6NXQUV8&datatype=json';
  }

  public IsStockSelected() {
    // console.log(this.configUrl);
    this.weekDates = [];
    this.weeklyData = [];
    for (let i = 7; i >= 0; i--) {
      const dateOfWeek = moment().subtract(i, 'd').format('YYYY-MM-DD');
      let validStockVal = '';
      if (
        this.data === undefined ||
        this.data[dateOfWeek] === undefined ||
        this.data[dateOfWeek]['4. close'] === undefined
      ) {
        validStockVal = '';
      } else {
        validStockVal = this.data[dateOfWeek]['4. close'];
      }
      if (new Date(dateOfWeek).getDay() === 6 || new Date(dateOfWeek).getDay() === 0) {
        console.log('is weekend: ' + dateOfWeek);
      } else {
      this.weekDates.push({
        date: dateOfWeek,
        stockValue: validStockVal,
      });
    }
    }
    // console.log(this.weekDates);
  }

  public isButtonSelected(): void {
    this.stockSelected = !this.stockSelected;
    // console.log(document.activeElement.innerHTML.toLocaleUpperCase());
  }
}

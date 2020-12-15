import { Component, VERSION } from "@angular/core";
// import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  // name = "Angular 5";
  name = "Angular " + VERSION.major;
  stockSelected = false;
  currentSelection = "";
  stockData: String[];
  data: string;
  weeklyData: number[] = [];
  weekDates: { date: string; stockValue: string }[] = [];
  public lineChartData: ChartDataSets[] = [{ data: [], label: "" }];
  public stockCharts: ChartDataSets[] = [{ data: [], label: "" }];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(204, 204, 255, 0.3)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];

  stocksList: string[] = [
    "Biocon",
    "item1",
    "item1",
    "item1",
    "item1",
    "item1",
    "item1",
  ];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  onStockSelection(type: string) {
    // this.lineChartData[0].data = [];
    // this.lineChartData[0].label = type;
    this.lineChartLabels = [];
    this.stockCharts[0].data = [];
    this.getStockUrl(type.toLocaleUpperCase());
    if (
      document.activeElement &&
      document.activeElement instanceof HTMLButtonElement
    ) {
      document.activeElement.blur();
    }
    if (this.lineChartData.filter((entry) => entry.label === type).length > 0) {
      this.weekDates.map((entry) => this.lineChartLabels.push(entry.date));
      // this.weekDates.map((x, i) => {return {'stockValue': this.stockCharts[0].data[i]}});
      this.stockCharts[0].data = this.lineChartData.find(
        (entry) => entry.label === type
      ).data;
      
      this.stockCharts[0].label = this.lineChartData.find(
        (entry) => entry.label === type
      ).label;
      this.weekDates.map((entry, i) => entry.stockValue = this.stockCharts[0].data[i].toString());
      console.log(this.weekDates);

      //  console.log(this.lineChartData);
    } else {
      this.displayWeeklyUpdates().then((result) => {
        this.data = result["Time Series (Daily)"];
        this.IsStockSelected();
        this.weekDates.map((entry) =>
          this.weeklyData.push(Number(entry.stockValue))
        );
        this.weekDates.map((entry) => this.lineChartLabels.push(entry.date));
        this.stockCharts[0].data = this.weeklyData;
        this.stockCharts[0].label = type;
        this.lineChartData.push({ data: this.weeklyData, label: type });
        // console.log(this.weekDates);
      });
    }
    // console.log(this.stockCharts[0]);
  }

  configUrl = "";

  displayWeeklyUpdates() {
    const today = moment().format("YYYY-MM-DD");
    const aWeekBefore = moment().subtract(1, "week").format("YYYY-MM-DD");
    // console.log(aWeekBefore);
    return this.http.get(this.configUrl).toPromise();
  }

  getStockUrl(urlFragment: string): void {
    this.configUrl =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:" +
      urlFragment +
      "&apikey=8RQQ07SRZ6NXQUV8&datatype=json";
  }

  IsStockSelected() {
    // console.log(this.configUrl);
    this.weekDates = [];
    this.weeklyData = [];
    for (let i = 1; i <= 7; i++) {
      const dateOfWeek = moment().subtract(i, "d").format("YYYY-MM-DD");
      let validStockVal = "";
      if (
        this.data === undefined ||
        this.data[dateOfWeek] === undefined ||
        this.data[dateOfWeek]["4. close"] === undefined
      ) {
        validStockVal = "";
      } else {
        validStockVal = this.data[dateOfWeek]["4. close"];
      }
      this.weekDates.push({
        date: dateOfWeek,
        stockValue: validStockVal,
      });
    }
    // console.log(this.weekDates);
  }

  isButtonSelected(): void {
    this.stockSelected = !this.stockSelected;
    // console.log(document.activeElement.innerHTML.toLocaleUpperCase());
  }
}

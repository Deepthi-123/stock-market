import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stock-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  constructor() { }

  @Input() public weekDates: {date: string; stockValue: string}[];
  public ngOnInit() {
  }

}

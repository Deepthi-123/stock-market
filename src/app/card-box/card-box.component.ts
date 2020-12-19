import { ElementRef, HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stock-card-box',
  styleUrls: ['./card-box.component.css'],
  templateUrl: './card-box.component.html',
})
export class CardBoxComponent implements OnInit {
  constructor(private elRef: ElementRef) {}

  public ngOnInit() {
  }

}

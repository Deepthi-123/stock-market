import { ElementRef, HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stock-card-box',
  styleUrls: ['./card-box.component.css'],
  templateUrl: './card-box.component.html',
})
export class CardBoxComponent implements OnInit {
  public isHovered = false;
  constructor(private elRef: ElementRef) {}

  @Input() public text: any;
  public ngOnInit() {
  }

  public mouseenter() {
    this.isHovered = true;
    this.elRef.nativeElement.style.setProperty('--transition-type', 'linear');
  }

  public mouseleave() {
    this.isHovered = false;
  }

}

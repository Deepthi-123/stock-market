import { 
  Directive,
  Input,
  HostListener,  // listen to the DOM for any Event that may occur
  ElementRef } // allow angular to have direct access to DOM
from '@angular/core';



@Directive(
  { selector: '[AttrDirectivetut]' }
)
export class AttributeDirectiveTut{

  @Input() Attr :string; // gets values from another Component
  @Input() Disp :string;
 
  @HostListener('click') onclick() {  //executes when the Directive is clicked
  this.highlight(this.Disp, this.Attr);
  }

  constructor(private el : ElementRef) { 
    //this.el.nativeElement.innerHTML = "";
    this.el.nativeElement.style.color = "red";
  }

  public highlight(dis: string, bc?: string,) {
    if(dis === 'None'){
         this.el.nativeElement.style.display = dis;
    }else{
         this.el.nativeElement.style.backgroundColor = bc;
         this.el.nativeElement.style.display = dis;
    }
} 
  
}
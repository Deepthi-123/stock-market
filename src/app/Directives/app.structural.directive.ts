import { 
  Directive,
  Input,
  TemplateRef, // contains what's inside your <template> tag
  ViewContainerRef } //holds the template's view and will let you to embed what's inside the template into the view itself.
from '@angular/core';

// structural Directive like *ngIf or *ngFor

@Directive(
  { selector: '[AngularDirectivetut]'}
)
export class DirectiveTut{
  constructor(
  private templateRef: TemplateRef<any>,
  private viewContainer: ViewContainerRef) { }
  // function executed when  AngularDirectivetut is passed a value
    @Input() set AngularDirectivetut(condition: boolean) {
        if (condition) {
            this.viewContainer.clear();
        }
        else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
//ngOnChanges is called right after the data-bound properties have been checked and before view and content children are checked if at least one of them has changed (copy and paste from the docs).
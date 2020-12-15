import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DirectiveTut } from './Directives/app.structural.directive';
import { AttributeDirectiveTut } from './Directives/app.attribute.directive';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, ChartsModule ],
  declarations: [ 
    AppComponent,
    DirectiveTut,
    AttributeDirectiveTut ],
  bootstrap:    [ AppComponent ],
  providers: [ ]
})
export class AppModule { }

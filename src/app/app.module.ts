import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DirectiveTut } from './Directives/app.structural.directive';
import { AttributeDirectiveTut } from './Directives/app.attribute.directive';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TableDataComponent } from './table-data/table-data.component';
import { CardBoxComponent } from './card-box/card-box.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, ChartsModule ],
  declarations: [			 
    AppComponent,
    DirectiveTut,
    AttributeDirectiveTut,
      LineChartComponent,
      TableDataComponent,
      CardBoxComponent
   ],
  bootstrap:    [ AppComponent ],
  providers: [ ]
})
export class AppModule { }

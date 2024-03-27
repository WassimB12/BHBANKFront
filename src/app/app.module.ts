import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursMarcheComponent } from './cours-marche/cours-marche.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';








@NgModule({
  declarations: [
    AppComponent,
    CoursMarcheComponent,
    UserComponent,
    AdminComponent,



    ],
  imports: [HttpClientModule,MatTableModule,
    BrowserModule,
    AppRoutingModule,CanvasJSAngularChartsModule,
    MatTableExporterModule,
    MatButtonModule,MatFormFieldModule
    ,MatInputModule,BrowserAnimationsModule,FormsModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }) ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

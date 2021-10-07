import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ApiService} from "../service/api.service";
import {RequestService} from "../service/utils/request.service";
import {OneWorkerService} from "../service/utils/one-worker.service";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {HomePageComponent} from "../component/homepage.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService,
    RequestService,
    OneWorkerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './/app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './services/http.service';

import { TosComponent } from './pages/tos/tos.component';
import { WordpressService } from './providers/wordpress.service';
import { apiURL, cmsURL } from './shared/constants';
import { ProcessHttpmsgProvider } from './providers/process-httpmsg';
import { SafeHtmlPipe } from "./shared/pipe.safehtml";
import { HomeComponent } from './pages/home/home.component';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpService(backend, defaultOptions);
}


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    SafeHtmlPipe,
    TosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, HttpModule
  ],
  providers: [
    WordpressService,
    { provide: HttpService, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
    { provide: 'apiURL', useValue: apiURL },
    { provide: 'CMSURL', useValue: cmsURL },
    ProcessHttpmsgProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Geolocation} from "@ionic-native/geolocation";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MallsinfoPage} from "../pages/mallsinfo/mallsinfo";
import { MallsdetailsProvider } from '../providers/mallsdetails/mallsdetails';
import {HttpModule} from "@angular/http";
import {JsonpModule} from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MallsinfoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MallsinfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MallsdetailsProvider,
    HttpModule

  ]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormulaireComponent } from './components/formulaire/formulaire.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';

@NgModule({
  declarations: [AppComponent, FormulaireComponent, HistoriqueComponent, StatistiquesComponent],
  entryComponents: [FormulaireComponent, HistoriqueComponent, StatistiquesComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    CallNumber,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

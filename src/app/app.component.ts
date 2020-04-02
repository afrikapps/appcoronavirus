import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as parse from 'parse';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {


      parse.serverURL = 'https://sandbox-api.afrikapps.com/parse'; // This is your Server URL
      parse.initialize(
        'h67d32aqvnklmp0oiyt543zsxcvfgt568', // This is your Application ID
        'gty7654edszaqwxcvjhyu9076543tyuiolkjht5' // This is your Javascript key
      );
      
      setTimeout(async () => {
        this.showSplash = false;
      }, 3000);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

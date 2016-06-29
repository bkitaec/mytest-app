/// <reference path="../node_modules/angularfire2/firebase3.d.ts" />
import * as firebase from 'firebase';

import { Component, ViewChild } from '@angular/core';
import { App, ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>
  
  fbConf: any = {
    apiKey: "AIzaSyA8eJYS_VzNs4VGQQYKATSKg-0RYai3Azg",
    authDomain: "project-7794296316400472128.firebaseapp.com",
    databaseURL: "https://project-7794296316400472128.firebaseio.com",
    storageBucket: "project-7794296316400472128.appspot.com"
  };
  
  constructor(private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page uno', component: Page1 },
      { title: 'Page dos', component: Page2 }
    ];
        
    firebase.initializeApp(this.fbConf);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // If there's a user take him to the home page.
        this.rootPage=HomePage;
        this.nav.setRoot(HomePage);
      } else {
        // If there's no user logged in send him to the LoginPage
        this.rootPage=LoginPage;
        this.nav.setRoot(LoginPage);

      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);

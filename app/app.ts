import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/auth//login/login';

import { TestPage } from './pages/test/test';
import { LessonsPage } from './pages/lessons/lessons';

import {AudioProvider, WebAudioProvider} from 'ionic-audio/dist/ionic-audio';
import {Type, provide} from '@angular/core';


@Component({
  templateUrl: 'build/app.html',
  providers:  [provide(AudioProvider,  { useFactory: AudioProvider.factory })] // or use [WebAudioProvider] to force HTML5 Audio
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  logoUrl: string;

  pages: Array<{title: string, component: any, icon: string}>

  
  constructor(private platform: Platform) {
    this.initializeApp();
    this.logoUrl = "img/logo.png";

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Главная', component: HomePage, icon:"md-flower" },
      { title: 'Уроки', component: LessonsPage, icon: "md-flower" },
      { title: 'Тесты', component: TestPage, icon: "md-flower" }
    ];
        
      if (true) {
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

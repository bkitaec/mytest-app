import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/auth//login/login';

import { QuizPage } from './pages/quiz/quiz';
import { LessonsPage } from './pages/lessons/lessons';

import {AudioProvider, WebAudioProvider} from 'ionic-audio/dist/ionic-audio';
import {Type, provide} from '@angular/core';
import {Auth} from './providers/auth/auth';


@Component({
  templateUrl: 'build/app.html',
  providers: [Auth, provide(AudioProvider,  { useFactory: AudioProvider.factory })]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  logoUrl: string;

  pages: Array<{title: string, component: any, icon: string}>

  
  constructor(private platform: Platform) {
    this.initializeApp();
    this.logoUrl = "img/logo.png";

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Главная', component: HomePage, icon:"md-sunny" },
      { title: 'Уроки', component: LessonsPage, icon: "md-list-box" },
      { title: 'Тесты', component: QuizPage, icon: "md-checkmark-circle-outline" }
    ];
        
      //if (true) {
        // If there's a user take him to the home page.
        //this.rootPage=HomePage;
        //this.nav.setRoot(HomePage);
      //} else {
      //  // If there's no user logged in send him to the LoginPage
      //  this.rootPage=LoginPage;
      //  this.nav.setRoot(LoginPage);
      //
      //}
  }

  // ngOnInit() {
  //   this.af.auth.subscribe(data => {
  //     if (data) {
  //       this.authInfo = data;
  //     } else {
  //       this.authInfo = null;
  //       this.showLoginModal();
  //     }
  //   });
  // }
  // showLoginModal() {
  //   let loginPage = Modal.create(AuthPage);
  //   this.navCtrl.present(loginPage);
  // }
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

ionicBootstrap(MyApp, [], {
  backButtonText: '',
  iconMode: 'ios',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabbarPlacement: 'bottom',
  pageTransition: 'ios',
});

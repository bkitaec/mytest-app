import { Injectable } from '@angular/core';
import { NavController, Loading, Alert } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';


@Injectable()
export class Notification {

  constructor(public nav: NavController) {
    this.nav = nav;
  }

  load() {
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }

  alert(msg) {
    let prompt = Alert.create({
      message: msg,
      buttons: [{text: "Ok"}]
    });
    this.nav.present(prompt);
  }
  
  alertAndGoHome(msg) {
    let prompt = Alert.create({
      message: msg,
      buttons: [{text: "Ok"}]
    });
    this.nav.present(prompt);

    // this.nav.push(HomePage);

  }

}


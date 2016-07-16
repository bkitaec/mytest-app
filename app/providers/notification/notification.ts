import { Injectable } from '@angular/core';
import {NavController, Loading} from 'ionic-angular';


@Injectable()
export class Notification {
  data: any;

  constructor(public nav: NavController) {
    this.nav = nav;
  }

  load() {
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }
}


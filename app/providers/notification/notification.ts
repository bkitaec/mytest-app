import { Injectable } from '@angular/core';
import {NavController, Loading} from 'ionic-angular';

/*
  Generated class for the Notification provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
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


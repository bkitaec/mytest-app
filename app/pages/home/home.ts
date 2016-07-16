import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {LoginPage} from '../../pages/auth/login/login';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  
  constructor(private nav: NavController) {
    this.nav = nav;
  }

  logOut(){
      this.nav.rootNav.setRoot(LoginPage);
  }
}

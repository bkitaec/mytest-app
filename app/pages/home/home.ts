import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthData} from '../../providers/auth-data/auth-data';
import {LoginPage} from '../../pages/auth/login/login';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AuthData]
})
export class HomePage {
  
  constructor(private nav: NavController, private authData: AuthData) {
    this.nav = nav;
    this.authData = authData;
  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.rootNav.setRoot(LoginPage);
    });
  }
}

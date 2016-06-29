import {NavController, Loading} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthData} from '../../providers/auth-data/auth-data';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/reset-password/reset-password.html',
  providers: [AuthData]
})
export class ResetPasswordPage {
  public resetPasswordForm: any = {
    email: ''
  };


  constructor(public authData: AuthData, public nav: NavController) {
    this.authData = authData;
    
  }

  resetPassword(event){
    event.preventDefault();
    this.authData.resetPassword(this.resetPasswordForm.email);
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }
}
import {NavController, Loading} from 'ionic-angular';
import {Component} from '@angular/core';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/auth/reset-password/reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: any = {
    email: ''
  };


  constructor(public nav: NavController) {

  }

  resetPassword(event){
    event.preventDefault();
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }
}
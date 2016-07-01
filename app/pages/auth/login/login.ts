import {NavController, Loading} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthData} from '../../../providers/auth-data/auth-data';
import {Notification} from '../../../providers/notification/notification';
import {SignupPage} from '../signup/signup';
import {ResetPasswordPage} from '../reset-password/reset-password';

@Component({
  templateUrl: 'build/pages/auth/login/login.html',
  providers: [AuthData, Notification]
})
export class LoginPage {
  public loginForm: any = {
    email:'',
    password:'',

  };


  constructor(public nav: NavController, public authData: AuthData, public notif: Notification) {
    this.nav = nav;
    this.notif = notif;
    this.authData = authData;

  }

  loginUser(){
    console.log(this.loginForm);
    this.authData.loginUser(this.loginForm.email, this.loginForm.password);
    this.notif.load();
    // let loading = Loading.create({
    //   dismissOnPageChange: true,
    // });
    // this.nav.present(loading);
  }

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}
import {NavController, Loading} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthData} from '../../providers/auth-data/auth-data';
import {SignupPage} from '../signup/signup';
import {ResetPasswordPage} from '../reset-password/reset-password';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})
export class LoginPage {
  public loginForm: any = {
    email:'',
    password:'',

  };


  constructor(public nav: NavController, public authData: AuthData) {
    this.nav = nav;
    this.authData = authData;

  }

  loginUser(){
    console.log(this.loginForm);
    this.authData.loginUser(this.loginForm.email, this.loginForm.password);
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}
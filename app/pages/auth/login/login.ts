import {NavController, Loading} from 'ionic-angular';
import {Component} from '@angular/core';
import {Auth} from '../../../providers/auth/auth';
import {Notification} from '../../../providers/notification/notification';
import {SignupPage} from '../signup/signup';
import {ResetPasswordPage} from '../reset-password/reset-password';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/auth/login/login.html',
  providers: [Notification, Auth]
})
export class LoginPage {
  public loginForm: any = {
    email:'',
    password:'',

  };


  constructor(public nav: NavController, public notif: Notification, public auth:Auth) {
    this.nav = nav;
    this.notif = notif;
    this.auth = auth;

  }

  loginUser(){
    console.log(this.loginForm);
    
    let res = this.auth.login(this.loginForm.email, this.loginForm.password);
    console.log("RESSSULT");
    console.log(res);

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
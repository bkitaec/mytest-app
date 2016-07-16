import {NavController, Loading} from 'ionic-angular';
import {Component} from '@angular/core';
import {Auth} from '../../../providers/auth/auth';

@Component({
  templateUrl: 'build/pages/auth/signup/signup.html',
  providers: [Auth]
})
export class SignupPage {
  public signupForm: any = {
    username:'',
    email:'',
    password:''
  };

  constructor(public nav: NavController, public auth: Auth) {
    this.nav = nav;
    this.auth = auth;


  }

  signupUser(event){
    event.preventDefault();
    this.auth.signUp(this.signupForm);
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }
}
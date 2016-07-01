import {NavController, Loading} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthData} from '../../../providers/auth-data/auth-data';

@Component({
  templateUrl: 'build/pages/auth/signup/signup.html',
  providers: [AuthData]
})
export class SignupPage {
  public signupForm: any = {
    email:'',
    password:''
  };

  constructor(public nav: NavController, public authData: AuthData) {
    this.nav = nav;
    this.authData = authData;


  }

  signupUser(event){
    event.preventDefault();
    this.authData.signupUser(this.signupForm.email, this.signupForm.password);
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }
}
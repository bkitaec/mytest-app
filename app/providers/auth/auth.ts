import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from '../../pages/home/home';
import {LoginPage} from '../../pages/auth/login/login';
import {NavController, Alert} from 'ionic-angular';

@Injectable()
export class Auth {
  data: any;
  token: any;
  expires: any;

  constructor(private http: Http, public nav: NavController) {
    this.data = null;
    // this.cookie = cookie;
    this.http = http;

  }

  getToken(){
    console.log("TOKEN: "+ this.token);
    return this.token;
  }

  login(email, passord) {
    // if (this.data) {
    //   // already loaded data
    //   return Promise.resolve(this.data);
    // }
    return new Promise(resolve => {
      this.http.post('http://localhost:1309/auth/login', {email:email, password: passord})
        .map(res => res.json())
        .subscribe(data => {
          console.log("Login Success")
          console.log(data)
            
          this.token = data.token;
          this.expires = data.expires;
          // this.cookie.put('auth_token', this.token)
          // this.cookie.put('auth_expires', this.expires)
          this.nav.setRoot(HomePage);
          this.data = data;
          resolve(this.data);

        }, err => {
          console.log("Login ERROR:")
          console.log(err);
          let prompt = Alert.create({
            message: JSON.parse(err._body).error,
            buttons: [{text: "Ok"}]
          });
          this.nav.present(prompt);
          resolve(err);
        });
    });
  }

  signUp(user) {
    // if (this.data) {
    //   // already loaded data
    //   return Promise.resolve(this.data);
    // }
    return new Promise(resolve => {
      this.http.post('http://localhost:1309/user/create', user)
          .map(res => res.json())
          .subscribe(data => {
            console.log("SignUP Success")
            console.log(data)

            this.nav.setRoot(LoginPage);
            this.data = data;
            resolve(this.data);
            let prompt = Alert.create({
              message: "Try to Login",
              buttons: [{text: "Ok"}]
            });

          }, err => {
            console.log("SignUP ERROR:")
            console.log(err);
            let prompt = Alert.create({
              message: JSON.parse(err._body).error,
              buttons: [{text: "Ok"}]
            });
            this.nav.present(prompt);
            resolve(err);
          });
    });
  }
  
}
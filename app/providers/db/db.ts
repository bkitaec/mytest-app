import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from '../../pages/home/home';
import {LoginPage} from '../../pages/auth/login/login';
import {NavController, Alert} from 'ionic-angular';
import {Auth} from '../auth/auth';

@Injectable()
export class DB {
  public lessons: any;

  constructor(public nav: NavController, private http: Http, private auth: Auth) {
    this.nav = nav;
    this.http = http;
    this.auth = auth;

  }
    getTests(): any{
        return {};
    }

  getLessons() {
    if (this.lessons) {
      // already loaded data
      return Promise.resolve(this.lessons);
    }
    return new Promise(resolve => {
      let headers = new Headers();
      headers.set('Authorization', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyfHVuZGVmaW5lZCIsInN1YiI6InN1YmplY3QiLCJhdWQiOiJzYWlscy13YXRlcmxvY2stdG9rZW4tdGVtcGxhdGUiLCJleHAiOjE0Njg5ODU4NzYxNzgsIm5iZiI6MTQ2ODM4MTA3NjE3OCwiaWF0IjoxNDY4MzgxMDc2MTc4LCJqdGkiOiIyZmU4ZWIyMC00OGFiLTExZTYtODVkYi1jMTk5ZGI3NDAzYWIifQ.Eey2ffNAdRf179JeEjWg2vizZSR1sQTqmlzneqR3RQU");

      let opt: RequestOptions;
      opt = new RequestOptions({
          headers: headers
      });
      this.http.get('http://localhost:1309/lessons', opt)
          .map(res => {
            if(res.status < 200 || res.status >= 300) {
              this.nav.setRoot(LoginPage);
            }
            // If everything went fine, return the response
            else {
              return res.json();
            }
            
          })
          .subscribe(data => {
            console.log("Lessons")
            console.log(data)

            this.lessons = data;
            resolve(this.lessons);

          }, err => {
            console.log("Lessons ERROR:")
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

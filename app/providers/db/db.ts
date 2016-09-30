import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Auth} from '../auth/auth';
import {ApiConfig} from '../../config/api.config';

@Injectable()
export class DB {

  constructor( private http: Http, private auth: Auth) {
    this.http = http;
    this.auth = auth;
  }

  get(url_path, options) {
    return new Promise(resolve => {
      let url = ApiConfig[url_path];
      
      url = options.id? url + options.id: url;
      url = options.category_id? url + "?category_id=" + options.category_id: url;

      if(options.ids){
        url = url + "?";
        for(let i = 0; i <  options.ids.length; i++) {
            url = url + "id=" + options.ids[i] + "&&";
        }
      }

      let headers = new Headers();
      headers.set('Authorization', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyfHVuZGVmaW5lZCIsInN1YiI6InN1YmplY3QiLCJhdWQiOiJzYWlscy13YXRlcmxvY2stdG9rZW4tdGVtcGxhdGUiLCJleHAiOjE0Njg5ODU4NzYxNzgsIm5iZiI6MTQ2ODM4MTA3NjE3OCwiaWF0IjoxNDY4MzgxMDc2MTc4LCJqdGkiOiIyZmU4ZWIyMC00OGFiLTExZTYtODVkYi1jMTk5ZGI3NDAzYWIifQ.Eey2ffNAdRf179JeEjWg2vizZSR1sQTqmlzneqR3RQU");

      let opt: RequestOptions;
      opt = new RequestOptions({
          headers: headers
      });
      this.http.get(url, opt)
          .map(res => {
            if(res.status < 200 || res.status >= 300) {
              // this.nav.push(LoginPage);
            }
            // If everything went fine, return the response
            else {
              return res.json();
            }
              
          })
          .subscribe(data => {
            console.log(url)
            resolve(data);

          }, err => {
            console.log("Response ERROR:")
            console.log(err);
            // let prompt = Alert.create({
            //   message: JSON.parse(err._body).error,
            //   buttons: [{text: "Ok"}]
            // });
            // this.nav.present(prompt);
            resolve(err);
          });
    });
  }
}

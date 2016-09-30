import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DB } from '../../providers/db/db';
import { LessonsListPage } from './list/lessons-list';
import { Notification } from '../../providers/notification/notification';
import 'rxjs/add/operator/toPromise';
import { Auth } from '../../providers/auth/auth';

@Component({
  templateUrl: 'build/pages/lessons/lessons.html',
  providers: [DB, Notification, Auth]
})
export class LessonsPage {
  categorys: any = [];

  constructor(private nav: NavController, private db: DB, public notif: Notification, public auth: Auth) {
    this.notif = notif;
    this.notif.load();

    db.get('lessons.category', {}).then(data => {
      console.log(data);
      let new_data = JSON.parse(JSON.stringify(data));
      if(new_data.ok === false){
        this.notif.alertAndGoHome('Нет соединения. Подключите интернет и перезапустите приложение!');
      }

      this.categorys = data;
    }, err => {
      console.log(err)
    })
  }

  itemTapped(event, category) {
    // this.notif.load()
    // That's right, we're pushing to ourselves!
    this.nav.push(LessonsListPage, {
      category: category
    });
  }
}

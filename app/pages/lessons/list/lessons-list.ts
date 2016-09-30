import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DB } from '../../../providers/db/db';
import { LessonsViewPage } from '../view/lessons-view';
import { Notification } from '../../../providers/notification/notification';
import { Auth } from '../../../providers/auth/auth';

@Component({
  templateUrl: 'build/pages/lessons/list/lessons-list.html',
  providers: [DB, Notification, Auth]
})
export class LessonsListPage {
  lessons: any = [];
  category: any;

  constructor(private nav: NavController, private navParams: NavParams, private db: DB, public notif: Notification, public auth: Auth) {
    this.category = navParams.get('category');
    this.notif = notif;
    this.notif.load();

    db.get('lessons', {id: this.category.id }).then(data => {
      console.log(data);
      this.lessons = data;
    }, err => {
      console.log(err)
    })
  }

  itemTapped(event, lesson) {
    // this.notif.load()
    // That's right, we're pushing to ourselves!
    this.nav.push(LessonsViewPage, {
      lesson: lesson
    });
  }
}

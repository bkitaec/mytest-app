import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DB } from '../../providers/db/db';
import { LessonsViewPage } from './view/lessons-view';
import {Notification} from '../../providers/notification/notification';
import 'rxjs/add/operator/toPromise';
import {Auth} from '../../providers/auth/auth';

@Component({
  templateUrl: 'build/pages/lessons/lessons.html',
  providers: [DB, Notification, Auth]
})
export class LessonsPage {
  lessons: any = [];

  constructor(private nav: NavController, private db: DB, public notif: Notification, public auth: Auth) {
    this.notif = notif;
    this.notif.load();

    db.getLessons().then(data => {
      console.log(data);
      this.lessons = data;  
      // for(let i = 1; i <  data.length; i++) {
      //   this.lessons.push({
      //     id: i,
      //     title: data.val()[i].title,
      //     content: data.val()[i].content,
      //   });
      // }
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

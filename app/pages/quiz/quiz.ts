import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DB } from '../../providers/db/db';
import { QuizListPage } from './list/quiz-list';
import { QuizStatisticPage } from './statistic/quiz-statistic';
import {Notification} from '../../providers/notification/notification';
import 'rxjs/add/operator/toPromise';
import {Auth} from '../../providers/auth/auth';

@Component({
  templateUrl: 'build/pages/quiz/quiz.html',
  providers: [DB, Notification, Auth]
})
export class QuizPage {
  categorys: any = [];

  constructor(private nav: NavController, private db: DB, public notif: Notification, public auth: Auth) {
    this.notif = notif;
    this.notif.load();

    db.get('quiz.category', {}).then(data => {
      console.log(data);
      this.categorys = data;
    }, err => {
      console.log(err)
    })
  }

  itemTapped(event, category) {
    // this.notif.load()
    // That's right, we're pushing to ourselves!
    this.nav.push(QuizListPage, {
      category: category
    });
  }

  goToStatistics() {
    this.nav.push(QuizStatisticPage);
  }
  
}

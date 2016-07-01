import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DB } from '../../../providers/db/db';
import {Notification} from '../../../providers/notification/notification';


@Component({
  templateUrl: 'build/pages/test/view/test-view.html',
  providers: [DB, Notification]

})
@Component({
})
export class TestViewPage {

  id : number;
  inProgress : boolean;
  quizOver : boolean;
  correctAns : boolean;

  score : number;

  question : any;
  options : any;
  answer : any;
  answerMode : boolean;

  qestions: any;
  title: string;

  constructor(private nav: NavController, private db: DB, public notif: Notification, private navParams: NavParams) {
    this.qestions = this.navParams.get('test').list;
    this.title = this.navParams.get('test').hr;
    this.id = 1;
    this.quizOver = false;
    this.inProgress = true;
    this.getQuestion();
    this.reset();
  }

  reset() {
    this.inProgress = false;
    this.score = 0;
  }

  getQuestion() {
    let q = this.qestions(this.id);
    if(q) {
      this.question = q.q;
      this.options = q.v;
      this.answer = q.a;
      this.answerMode = true;
    } else {
      this.quizOver = true;
    }
  }

  checkAnswer(opt) {;
    if(opt == this.options[this.answer]) {
      this.score++;
      this.correctAns = true;
    } else {
      this.correctAns = false;
    }
    this.answerMode = false;
  };

  nextQuestion() {
    this.id++;
    this.getQuestion();
  }
}

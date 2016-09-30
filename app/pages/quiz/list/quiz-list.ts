import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DB } from '../../../providers/db/db';
import { QuizViewPage } from '../view/quiz-view';
import {Auth} from '../../../providers/auth/auth';

@Component({
  templateUrl: 'build/pages/quiz/list/quiz-list.html',
  providers: [DB, Auth]
})
export class QuizListPage {
  quizs: any = [];
  category: any;

  constructor(private nav: NavController, private navParams: NavParams, private db: DB, public auth: Auth) {
    this.category = navParams.get('category');
    this.db = db;
    this.db.get('quiz', {category_id: this.category.id }).then(data => {
      console.log(data);
      this.quizs = data;
    }, err => {
      console.log(err)
    })
  }

  itemTapped(event, quiz) {

    console.log(quiz.questions_arr);

    this.db.get('quiz.question', {ids: quiz.questions_arr}).then(question => {
      console.log(question);
      this.nav.push(QuizViewPage, {
        quiz: quiz,
        question: question
      });
    }, err => {
      console.log(err)
    });

  }
}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/test/view/test-view.html',

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
  options : any = [];
  answer : any;
  answerMode : boolean;

  qestions: any = [];
  title: string;

  constructor(private nav: NavController,  private navParams: NavParams) {
    let answ = this.navParams.get('test');
    for(let i = 1; i <  answ.list.length; i++) {
      this.qestions.push(answ.list[i]);
    }
    this.title = this.navParams.get('test').title;
    this.reset();
  }

  start(){
    this.inProgress = true;
  }

  reset() {
    this.inProgress = false;
    this.quizOver = false;
    this.score = 0;
    this.id = 0;
    this.getQuestion();
  }

  getQuestion() {
    let q = this.qestions[this.id];
    if(q) {
      this.question = q.q;
      this.options = [];
      for(let i = 1; i <  q.v.length; i++) {
        this.options.push(q.v[i]);
      }
      this.answer = q.a;
      this.answerMode = true;
    } else {
      this.quizOver = true;
    }

  }

  checkAnswer(e, opt) {
    if(opt === this.options[this.answer-1]) {
      this.score++;
      this.correctAns = true;
    } else {
      this.correctAns = false;
    }
    this.answerMode = false;
  }

  nextQuestion() {
    this.id++;
    this.getQuestion();
  }
}

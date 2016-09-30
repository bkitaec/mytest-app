import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/quiz/view/quiz-view.html'
})

export class QuizViewPage {

  id : number;
  inProgress : boolean;
  quizOver : boolean;
  correctAns : boolean;
  inCorrectAns : boolean;

  score : number;

  question : any;
  options : any = [];
  answer : any;
  answerMode : boolean;

  qestions: any = [];
  title: string;

  constructor(private nav:NavController,  private navParams: NavParams) {
    let quiz = this.navParams.get('quiz');

    this.qestions = this.navParams.get('question');
    this.title = quiz.title;
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
      this.question = q.question;
      this.options = [];
      for(let i = 0; i <  q.answers.length; i++) {
        if(q.answers[i].correct)
          this.answer = i;
        this.options.push(q.answers[i]);
      }
      this.answerMode = true;
    } else {
      this.quizOver = true;
    }

  }

  checkAnswer(e, opt) {
    if(opt === this.options[this.answer]) {
      this.score++;
      this.correctAns = true;
    } else {
      this.inCorrectAns = true;
    }
    this.answerMode = false;
  }

  nextQuestion() {
    this.id++;
    this.correctAns = false;
    this.inCorrectAns = false;

    this.getQuestion();
  }
}

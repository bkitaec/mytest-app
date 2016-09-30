import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatisticModel } from '../_model/statistic';

@Component({
  templateUrl: 'build/pages/quiz/statistic/quiz-statistic.html',
  providers: [StatisticModel]
})
export class QuizStatisticPage {

  private stats: any;

  constructor(private nav: NavController, private _stat: StatisticModel) {
    this.stats = _stat.getAll();
  }

}

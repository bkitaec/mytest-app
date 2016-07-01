import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the LessonsViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lessons/view/lessons-view.html',
})
export class LessonsViewPage {
  lesson: any;
  constructor(private nav: NavController, private navParams: NavParams) {
    this.lesson = navParams.get('lesson');
  }

}

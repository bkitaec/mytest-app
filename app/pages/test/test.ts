import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DB } from '../../providers/db/db';
import {Notification} from '../../providers/notification/notification';
import { TestViewPage } from './view/test-view';


@Component({
  templateUrl: 'build/pages/test/test.html',
  providers: [DB, Notification]

})
export class TestPage {
  tests: any = [];

  constructor(private nav: NavController, private db: DB, public notif: Notification) {
    notif.load()
    this.tests = [];
    db.getTests().on('value', data => {
      for(let i = 1; i <  data.val().length; i++) {
        let list = [];
        for(let j = 1; j <  data.val()[i].list.length; j++) {
          list.push({
            title: data.val()[i].list[j].title,
            list: data.val()[i].list[j].list
          })
          console.log(data.val()[i].hr);
        }
        this.tests.push({
          hr: data.val()[i].hr,
          list: list,
        });
      }
      console.log(this.tests);
    });
  }



  itemTapped(event, test) {
    // this.notif.load()
    // That's right, we're pushing to ourselves!
    this.nav.push(TestViewPage, {
      test: test
    });
  }

}

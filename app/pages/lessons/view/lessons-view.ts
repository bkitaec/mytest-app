import { Component, Provider } from '@angular/core';
import { NavController, NavParams, Toast } from 'ionic-angular';

import {WebAudioTrack, IAudioTrack, AudioTimePipe} from 'ionic-audio/dist/ionic-audio';
/*
  Generated class for the LessonsViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lessons/view/lessons-view.html',
  pipes: [AudioTimePipe],
})
export class LessonsViewPage {
  lesson: any;
  track: IAudioTrack;
  is_play: boolean = false;
  is_this_audio: string;
  is_was_toast: boolean = false;

  constructor(private nav: NavController, private navParams: NavParams) {
    this.lesson = navParams.get('lesson');
    this.track = new WebAudioTrack('');
    console.log(this.track);
  }

  play(audio){
    if(audio !== this.is_this_audio){
      this.is_play = false;
      this.track.pause();
    }

    if(!this.is_play){
      this.is_this_audio = audio;
      this.track = new WebAudioTrack('http://185.143.173.210:1309/' + audio);
      this.is_play = true;
      this.track.play();
      if(this.is_was_toast)
        this.playToast('Слушаем внимательно')
    }else{
      this.is_play = false;
      this.track.pause();
    }
  }

  playToast(msg){
      let toast = Toast.create({
        message: msg,
        duration: 2000,
        position: 'bottom'
      });

      this.nav.present(toast);
    }


}

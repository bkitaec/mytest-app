import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AudioTrackComponent, AudioTrackPlayComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent, AudioTimePipe, AudioProvider} from 'ionic-audio/dist/ionic-audio';

/*
  Generated class for the LessonsViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/lessons/view/lessons-view.html',
  directives: [AudioTrackComponent, AudioTrackPlayComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent],
})
export class LessonsViewPage {
  lesson: any;

  myTracks: any[];
  allTracks: any[];
  singleTrack: any;

  constructor(private nav: NavController, private navParams: NavParams, private _audioProvider: AudioProvider) {
    this.lesson = navParams.get('lesson');

    this.myTracks = [{
      src: 'https://firebasestorage.googleapis.com/v0/b/project-7794296316400472128.appspot.com/o/lessons%2F222.mp3?alt=media&token=386155fa-a003-45ba-a4fc-7e37883e9ec2',
      title: 'First mantra',
      //preload: 'none'
    },
      {
        src: 'https://archive.org/download/swrembel2010-03-07.tlm170.flac16/swrembel2010-03-07s1t05.mp3',
        title: 'Second mantra',
        //preload: 'none'
      }];

    this.singleTrack = {
      src: 'https://archive.org/download/swrembel2010-03-07.tlm170.flac16/swrembel2010-03-07s1t05.mp3',
      title: 'Stephane Wrembel Live',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track
    };
  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSomeTrack(selectedTrackIndex: number) {
    // do something with the track in response to some action
    this._audioProvider.play(selectedTrackIndex);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

}

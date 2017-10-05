import { Component } from '@angular/core';

import {PeopleServiceProvider} from '../../providers/people-service/people-service';
import {GetStuffProvider} from "../../providers/people-service/get-stuff";
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PeopleServiceProvider,GetStuffProvider]
})

export class HomePage {
 public trail:any;

  constructor(public navCtrl: NavController, public peopleservice: PeopleServiceProvider,public getstuff:GetStuffProvider) {
    this.restaurt();

  }

  restaurt(){
    this.peopleservice.load().
    then(data => {
      this.trail = data;
    });
  }
  rsenti(){
    this.getstuff.load().
    then(data => {
      this.trail2 = data;
    });
  }
}

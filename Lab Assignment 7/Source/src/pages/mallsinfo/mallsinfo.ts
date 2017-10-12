import { Component ,ViewChild ,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MallsdetailsProvider} from "../../providers/mallsdetails/mallsdetails";

/**
 * Generated class for the MallsinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-mallsinfo',
  templateUrl: 'mallsinfo.html',
})
export class MallsinfoPage {
  mallsinfo: any;
  mallsData: any={};
  pic: any={};
  rev: any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public malls: MallsdetailsProvider) {
    this.mallsinfo=navParams.get('mallsinfo')
    this.malls.detailedMalls(this.mallsinfo)
      .then(data => {
        this.mallsData = data;
        this.pic= this.mallsData.photos[0];
        this.rev= this.mallsData.reviews[1];
        console.log(this.mallsData.rating);
      })


  }


  getArray(size): Array<any> {
    return new Array(size);
  }
}

import { Component ,ViewChild ,ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MallsdetailsProvider} from "../../providers/mallsdetails/mallsdetails";
import {Http} from "@angular/http";

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
  dat: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public malls: MallsdetailsProvider, public http: Http) {
    this.mallsinfo=navParams.get('mallsinfo')
    this.malls.detailedMalls(this.mallsinfo)
      .then(data => {
        this.mallsData = data;
        this.pic= this.mallsData.photos[0];
        this.rev= this.mallsData.reviews[1];
        console.log(this.mallsData.rating);
      })


  }
  ionViewWillLoad() {

    return new Promise(resolve => {
      this.http.get("https://api.uclassify.com/v1/uclassify/genderanalyzer_v5/classify?readkey=qlstc4k8bghy&text=&this.reviews")
        .map(res => res.json())
        .subscribe(data => {

          this.dat = data;

          resolve(this.dat);



        })
    })
  }


  getArray(size): Array<any> {
    return new Array(size);
  }
}

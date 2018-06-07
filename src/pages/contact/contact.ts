import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

interface Contacts {name:string,icon:string,link:string};

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contacts: Contacts[];
  constructor(public navCtrl: NavController) {
    this.contacts = [{name:"Canal /LLNoob",icon:"assets/imgs/icons/youtube-icon.png",link:"https://www.youtube.com/llnoob"},{name:"Facebook /LLTheNoob",icon:"assets/imgs/icons/facebook-icon.png",link:"https://www.facebook.com/llthenoob/"},{name:"Discord",icon:"assets/imgs/icons/discord-icon.png",link:"https://discord.gg/GaZ2U5f"}]
  }
}

import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { HelperPage } from '../helper/helper';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HelperPage;
  tab3Root = ContactPage;

  constructor() {

  }
}

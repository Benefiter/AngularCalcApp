import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reduxiconmenu',
  templateUrl: './reduxiconmenu.component.html',
  styleUrls: ['./reduxiconmenu.component.css']
})
export class ReduxiconmenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handlePlus() {
    console.log('handled plus');
  }

  handleTimes() {
    console.log('handled times');
  }

  handleMinus() {
    console.log('handled minus');
  }

  handleDivide() {
    console.log('handled divide');
  }

  handleEquals() {
    console.log('handled equals');
  }
}


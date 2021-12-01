import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iconmenu',
  templateUrl: './iconmenu.component.html',
  styleUrls: ['./iconmenu.component.css']
})
export class IconmenuComponent implements OnInit {

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

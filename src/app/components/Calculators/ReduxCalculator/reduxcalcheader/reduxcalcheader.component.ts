import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reduxcalcheader',
  templateUrl: './reduxcalcheader.component.html',
  styleUrls: ['./reduxcalcheader.component.css']
})
export class ReduxcalcheaderComponent implements OnInit {

  @Input() operand: string;
  @Input() prevOperand: string;
  
  constructor() {
    this.operand = '';
    this.prevOperand = '';
  }

  ngOnInit(): void {}
}


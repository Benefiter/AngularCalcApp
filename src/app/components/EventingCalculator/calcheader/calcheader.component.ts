import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calcheader',
  templateUrl: './calcheader.component.html',
  styleUrls: ['./calcheader.component.css'],
})
export class CalcheaderComponent implements OnInit {
  @Input() operand: string;
  @Input() prevOperand: string;
  
  constructor() {
    this.operand = '';
    this.prevOperand = '';
  }

  ngOnInit(): void {}
}

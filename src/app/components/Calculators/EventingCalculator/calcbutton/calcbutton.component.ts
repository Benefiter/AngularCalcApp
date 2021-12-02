import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calcbutton',
  templateUrl: './calcbutton.component.html',
  styleUrls: ['./calcbutton.component.css']
})
export class CalcbuttonComponent implements OnInit {
  @Input() text: string;
  @Output() calcButtonClick = new EventEmitter();
  constructor() { 
    this.text = "";
  }

  ngOnInit(): void {
  }

  onClick() {
    this.calcButtonClick.emit(this.text);
  }

}

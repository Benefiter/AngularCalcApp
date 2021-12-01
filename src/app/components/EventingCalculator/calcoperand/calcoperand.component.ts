import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calcoperand',
  templateUrl: './calcoperand.component.html',
  styleUrls: ['./calcoperand.component.css']
})
export class CalcoperandComponent implements OnInit {
  @Input() value: string;
  
  constructor() { 
    this.value = '';
  }

  ngOnInit(): void {
  }

}

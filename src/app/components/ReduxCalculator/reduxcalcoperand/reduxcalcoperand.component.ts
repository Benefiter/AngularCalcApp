import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reduxcalcoperand',
  templateUrl: './reduxcalcoperand.component.html',
  styleUrls: ['./reduxcalcoperand.component.css']
})
export class ReduxcalcoperandComponent implements OnInit {
  @Input() value: string;
  
  constructor() { 
    this.value = '';
  }

  ngOnInit(): void {
  }

}


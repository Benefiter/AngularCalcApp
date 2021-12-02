import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/redux/calculator.state.model';
import { setButtonClick } from '../../../../redux/calculator.actions';

@Component({
  selector: 'app-reduxcalcbutton',
  templateUrl: './reduxcalcbutton.component.html',
  styleUrls: ['./reduxcalcbutton.component.css'],
})
export class ReduxcalcbuttonComponent implements OnInit {
  @Input() text: string;
  @Output() calcButtonClick = new EventEmitter();

  constructor(private store: Store<IAppStore>) {
    this.text = '';
  }

  ngOnInit(): void {}

  onClick() {
    this.store.dispatch(setButtonClick({ button: this.text }))
    this.calcButtonClick.emit(this.text);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faSave,
  faWindowMinimize,
  faWindowRestore,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faDivide,
  faEquals,
  faEraser,
  faMinus,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

type IconType =
  | 'times'
  | 'divide'
  | 'plus'
  | 'minus'
  | 'equals'
  | 'collapse'
  | 'expand'
  | 'clear'
  | 'save'
  | 'menu'
  | 'leftarrow'
  | 'rightarrow';
type ColorType = string;

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit {
  @Input() icon: IconType;
  @Input() color: ColorType;
  @Input() title: string;
  @Output() iconClick = new EventEmitter();

  theIcon = faTimes;

  constructor() {
    this.icon = 'times';
    this.color = 'black';
    this.theIcon = faTimes;
    this.title = this.icon;
  }

  ngOnInit(): void {
    switch (this.icon) {
      case 'times':
        this.theIcon = faTimes;
        break;
      case 'divide':
        this.theIcon = faDivide;
        break;
      case 'plus':
        this.theIcon = faPlus;
        break;
      case 'minus':
        this.theIcon = faMinus;
        break;
      case 'equals':
        this.theIcon = faEquals;
        break;
      case 'collapse':
        this.theIcon = faWindowMinimize;
        break;
      case 'expand':
        this.theIcon = faWindowRestore;
        break;
      case 'clear':
        this.theIcon = faEraser;
        break;
      case 'save':
        this.theIcon = faSave;
        break;
      case 'menu':
        this.theIcon = faBars;
        break;
      case 'leftarrow':
        this.theIcon = faArrowLeft;
        break;
      case 'rightarrow':
        this.theIcon = faArrowRight;
        break;
    }
  }

  colorStyle(): any {
    const style = `{'color': '${this.color}'}`;
    return style;
  }

  onClick() {
    this.iconClick.emit(this.icon);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { faTimes, faDivide, faPlus, faMinus, faEquals } from '@fortawesome/free-solid-svg-icons';

type IconType = 'times' | 'divide' | 'plus' | 'minus' | 'equals';
type ColorType = 'red' | 'black' | 'green' | 'blue';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() icon: IconType;
  @Input() color: ColorType;

  theIcon = faTimes;

  constructor() {
    this.icon = 'times';
    this.color = 'black';
    this.theIcon = faTimes;
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
    }
  }

  colorStyle() : any {
    const style = `{'color': '${this.color}'}`;
    console.log('style');
    console.log(style);
    return style;
  }
}

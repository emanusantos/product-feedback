import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Option } from 'src/app/types/option';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Input() totalItems = 0;
}

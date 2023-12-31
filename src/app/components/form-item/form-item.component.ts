import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.sass'],
})
export class FormItemComponent {
  @Input() title = '';
  @Input() description = '';
}

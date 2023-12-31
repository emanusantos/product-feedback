import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  @Input() label = '';
  @Input() color?: string;
  @Input() type?: 'button' | 'submit' = 'button';
}

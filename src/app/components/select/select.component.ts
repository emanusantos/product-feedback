import { Component } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent {
  initialValue = 'downvotes';

  getSelectedValue(event: any) {
    this.initialValue = event.target.value;

    console.log(this.initialValue)
  }
}

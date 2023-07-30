import { Component, EventEmitter, Output } from '@angular/core';

import { Option } from 'src/app/types/option';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
})
export class SelectComponent {
  @Output() provideSort = new EventEmitter<Option>();
  isSelectVisible = false;

  options: Array<Option> = [
    { label: 'Most Upvotes', value: 'upvotes', order: 'DESC' },
    { label: 'Least Upvotes', value: 'upvotes', order: 'ASC' },
    { label: 'Most Comments', value: 'comments', order: 'DESC' },
    { label: 'Least Comments', value: 'comments', order: 'ASC' },
  ];

  selectedOption: Option = this.options[0];

  toggleSelect() {
    this.isSelectVisible = !this.isSelectVisible;
  }

  selectOption(option: Option) {
    if (this.selectedOption === option) {
      this.isSelectVisible = false;
      return;
    }

    this.provideSort.emit(option);

    this.selectedOption = option;

    this.isSelectVisible = false;
  }

  getIcon() {
    return this.isSelectVisible
      ? '../../../assets/shared/icon-arrow-up.svg'
      : '../../../assets/shared/icon-arrow-down.svg';
  }
}

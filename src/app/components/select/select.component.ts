import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { Option } from 'src/app/types/option';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
})
export class SelectComponent {
  isSelectVisible = false;

  options: Array<Option> = [
    { label: 'Most Upvotes', value: 'upvotes', order: 'DESC' },
    { label: 'Least Upvotes', value: 'upvotes', order: 'ASC' },
    { label: 'Most Comments', value: 'comments', order: 'DESC' },
    { label: 'Least Comments', value: 'comments', order: 'ASC' },
  ];

  selectedOption: Option = this.options[0];

  constructor(private apiService: ApiService) {}

  toggleSelect() {
    this.isSelectVisible = !this.isSelectVisible;
  }

  selectOption(option: Option) {
    if (this.selectedOption === option) {
      this.isSelectVisible = false;
      return;
    }

    this.apiService.setSort(option);

    this.selectedOption = option;

    this.isSelectVisible = false;
  }

  getIcon() {
    return this.isSelectVisible
      ? '../../../assets/shared/icon-arrow-up.svg'
      : '../../../assets/shared/icon-arrow-down.svg';
  }
}

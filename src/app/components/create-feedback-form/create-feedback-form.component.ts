import { Component } from '@angular/core';
import { categoriesWithoutAll } from 'src/app/constants/categories';

@Component({
  selector: 'app-create-feedback-form',
  templateUrl: './create-feedback-form.component.html',
  styleUrls: ['./create-feedback-form.component.sass'],
})
export class CreateFeedbackFormComponent {
  isSelectVisible = true;
  categories = categoriesWithoutAll;
  selectedCategory = this.categories[0];

  toggleSelect() {
    this.isSelectVisible = !this.isSelectVisible;
  }

  getIcon() {
    return this.isSelectVisible
      ? '../../../assets/shared/icon-arrow-up-purple.svg'
      : '../../../assets/shared/icon-arrow-down-purple.svg';
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}

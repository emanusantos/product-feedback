import { Component } from '@angular/core';
import { categoriesWithoutAll } from 'src/app/constants/categories';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-create-feedback-form',
  templateUrl: './create-feedback-form.component.html',
  styleUrls: ['./create-feedback-form.component.sass'],
})
export class CreateFeedbackFormComponent {
  isSelectVisible = false;
  categories = categoriesWithoutAll;

  model = new Feedback('', this.categories[0], '');

  toggleSelect() {
    this.isSelectVisible = !this.isSelectVisible;
  }

  getIcon() {
    return this.isSelectVisible
      ? '../../../assets/shared/icon-arrow-up-purple.svg'
      : '../../../assets/shared/icon-arrow-down-purple.svg';
  }

  selectCategory(category: string) {
    this.model.category = category;
  }
}

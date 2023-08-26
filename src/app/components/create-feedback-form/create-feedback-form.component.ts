import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { categoriesWithoutAll } from 'src/app/constants/categories';
import { Feedback } from 'src/app/models/feedback.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-feedback-form',
  templateUrl: './create-feedback-form.component.html',
  styleUrls: ['./create-feedback-form.component.sass'],
})
export class CreateFeedbackFormComponent {
  isSelectVisible = false;
  categories = categoriesWithoutAll;

  model = new Feedback('', this.categories[0], '');

  constructor(
    private readonly apiService: ApiService,
    private router: Router
  ) {}

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

  onSubmit() {
    this.apiService.addFeedback(this.model);

    this.router.navigate(['/']);
  }
}

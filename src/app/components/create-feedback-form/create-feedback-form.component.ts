import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { categoriesWithoutAll } from 'src/app/constants/categories';
import { status } from 'src/app/constants/status';
import { Feedback } from 'src/app/models/feedback.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-feedback-form',
  templateUrl: './create-feedback-form.component.html',
  styleUrls: ['./create-feedback-form.component.sass'],
})
export class CreateFeedbackFormComponent {
  isCategorySelectVisible = false;
  isStatusSelectVisible = false;
  categories = categoriesWithoutAll;
  status = status;

  @Input() model = new Feedback('', this.categories[0], '');

  constructor(
    private readonly apiService: ApiService,
    private router: Router
  ) {}

  toggleCategorySelect() {
    this.isCategorySelectVisible = !this.isCategorySelectVisible;
  }

  toggleStatusSelect() {
    this.isStatusSelectVisible = !this.isStatusSelectVisible;
  }

  getIcon() {
    return this.isCategorySelectVisible
      ? '../../../assets/shared/icon-arrow-up-purple.svg'
      : '../../../assets/shared/icon-arrow-down-purple.svg';
  }

  selectCategory(category: string) {
    this.model.category = category;
  }

  selectStatus(status: string) {
    this.model.status = status;
  }

  onSubmit() {
    if (this.model.id) return;

    this.apiService.addFeedback(this.model);

    this.router.navigate(['/']);
  }
}

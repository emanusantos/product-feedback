import { Component, OnInit } from '@angular/core';
import { categoriesWithoutAll } from 'src/app/constants/categories';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.sass'],
})
export class CreateFeedbackComponent implements OnInit {
  isSelectVisible = true;
  categories = categoriesWithoutAll;
  selectedCategory = this.categories[0];

  ngOnInit(): void {
    document.body.className = 'create';
  }

  handleClick(category: string) {
    console.log(category);
  }

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

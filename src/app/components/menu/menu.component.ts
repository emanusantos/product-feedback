import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent {
  @Output() provideFilter = new EventEmitter<string>();
  categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
  selectedCategory = 'All';

  selectCategory(category: string) {
    this.selectedCategory = category;

    this.provideFilter.emit(category);
  }
}

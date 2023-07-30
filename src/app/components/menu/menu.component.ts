import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent {
  categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
  selectedCategory = 'All';

  constructor(private apiService: ApiService) {}

  getRoadmap() {
    const data = this.apiService.dataSource.getValue();

    let [planned, inProgress, live] = [0, 0, 0];

    data.productRequests.forEach((item) => {
      if (item.status === 'planned') planned++;

      if (item.status === 'in-progress') inProgress++;

      if (item.status === 'live') live++;
    });

    return {
      planned,
      inProgress,
      live,
    };
  }

  selectCategory(category: string) {
    this.selectedCategory = category;

    this.apiService.setFilter(category);
  }
}

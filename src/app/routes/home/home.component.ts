import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import * as mock from 'assets/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  data: typeof mock = {
    currentUser: {} as typeof mock.currentUser,
    productRequests: [],
  };

  filteredData: typeof mock.productRequests | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    document.body.className = 'home';

    this.apiService.fetchJSON().subscribe((data) => {
      this.data = data;
    });
  }

  filterData(filter: string) {
    if (filter === 'All') {
      this.filteredData = undefined;

      return;
    }

    this.filteredData = this.data.productRequests.filter(
      (item) => item.category === filter.toLowerCase()
    );
  }
}

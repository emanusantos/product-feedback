import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import * as mock from 'assets/data.json';
import { Option } from 'src/app/types/option';

type ProductRequests = typeof mock.productRequests;

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

  filteredData: ProductRequests | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    document.body.className = 'home';

    this.apiService.fetchJSON().subscribe((data) => {
      this.data = {
        ...data,
        productRequests: data.productRequests.sort((a, b) =>
          a.upvotes < b.upvotes ? 1 : -1
        ),
      };
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

  sortData({ order, value: parameter }: Option) {
    const sortByParameter = {
      upvotes: (a: ProductRequests[number], b: ProductRequests[number]) => {
        if (order === 'DESC') {
          return a.upvotes < b.upvotes ? 1 : -1;
        }

        return a.upvotes > b.upvotes ? 1 : -1;
      },
      comments: (a: ProductRequests[number], b: ProductRequests[number]) => {
        if (order === 'DESC') {
          return Number(a.comments?.length) < Number(b.comments?.length)
            ? 1
            : -1;
        }

        return Number(a.comments?.length) > Number(b.comments?.length) ? 1 : -1;
      },
    };

    if (this.filteredData) {
      this.filteredData = this.filteredData.sort(sortByParameter[parameter]);
      return;
    }

    this.data.productRequests = this.data.productRequests.sort(
      sortByParameter[parameter]
    );
  }
}

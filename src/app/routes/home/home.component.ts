import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import * as mock from 'assets/data.json';
import { Option } from 'src/app/types/option';

type ProductRequests = typeof mock.productRequests;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  data: ProductRequests = [];

  filteredData: ProductRequests = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    document.body.className = 'home';

    this.apiService.currentData.subscribe((data) => {
      this.data = data.productRequests.filter(
        (item) => item.status === 'suggestion'
      );
    });

    this.apiService.filteredData.subscribe((data) => {
      this.filteredData = data.filter((item) => item.status === 'suggestion');
    });
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }
}

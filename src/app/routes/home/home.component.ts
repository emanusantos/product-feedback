import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import * as mock from 'assets/data.json';
import { Option } from 'src/app/types/option';
import { Subscription } from 'rxjs';

type ProductRequests = typeof mock.productRequests;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  dataSubscription!: Subscription;
  filteredSubscription!: Subscription;

  data: ProductRequests = [];
  filteredData: ProductRequests = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    document.body.className = 'home';

    this.apiService.fetchFeedbacks().subscribe({
      next: (feedbacks) => {
        console.log({ feedbacks });
      },
      error: (err) => {
        console.log({ err });
      },
    });

    this.dataSubscription = this.apiService.currentData.subscribe((data) => {
      this.data = data.productRequests.filter(
        (item) => item.status === 'suggestion'
      );
    });

    this.filteredSubscription = this.apiService.filteredData.subscribe(
      (data) => {
        this.filteredData = data.filter((item) => item.status === 'suggestion');
      }
    );
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.filteredSubscription.unsubscribe();

    document.body.className = '';
  }
}

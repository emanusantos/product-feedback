import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { Subscription } from 'rxjs';
import { Feedback } from 'src/app/types/feedback';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  data: Array<Feedback> = [];
  filteredData: Array<Feedback> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    document.body.className = 'home';

    this.subscription = this.apiService.fetchFeedbacks().subscribe({
      next: (feedbacks) => {
        console.log({ feedbacks });
      },
      error: (err) => {
        console.log({ err });
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    document.body.className = '';
  }
}

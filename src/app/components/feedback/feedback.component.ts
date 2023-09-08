import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Feedback } from 'src/app/types/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.sass'],
})
export class FeedbackComponent {
  constructor(private router: Router, private apiService: ApiService) {}

  @Input() request: Feedback & {
    isUpvoted?: boolean;
  } = {
    id: '',
    title: '',
    description: '',
    category: '',
    status: '',
    upvotes: 0,
    comments: [],
    isUpvoted: false,
  };

  handleClick() {
    const currentFetchedFeedback = this.apiService.selectedFeedback.getValue();

    if (currentFetchedFeedback.id === this.request.id) {
      this.router.navigate(['/feedback', this.request.id]);
      return;
    }

    this.apiService.getFeedback(this.request.id, () => {
      this.router.navigate(['/feedback', this.request.id]);
    });
  }
}

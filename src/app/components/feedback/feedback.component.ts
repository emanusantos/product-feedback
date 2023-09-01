import { Component, Input } from '@angular/core';
import { Feedback } from 'src/app/types/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.sass'],
})
export class FeedbackComponent {
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
}

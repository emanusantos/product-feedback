import { Component, Input } from '@angular/core';

import * as mock from 'assets/data.json';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.sass'],
})
export class FeedbackComponent {
  @Input() request: (typeof mock.productRequests)[number] = {
    id: 0,
    title: '',
    description: '',
    category: '',
    status: '',
    upvotes: 0,
    comments: [],
  };
}

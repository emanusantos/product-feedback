import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Feedback } from 'src/app/types/option';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.sass'],
})
export class FeedbackDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  feedback: Feedback = {
    id: 0,
    category: '',
    description: '',
    status: '',
    title: '',
    upvotes: 0,
    comments: [],
  };

  ngOnInit(): void {
    document.body.className = 'details';

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    console.log({ id });

    this.apiService.getFeedback(id).subscribe((feedback) => {
      if (feedback) this.feedback = feedback;
    });
  }
}

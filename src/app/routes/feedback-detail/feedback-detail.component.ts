import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  numberOfComments = 0;
  text = '';

  ngOnInit(): void {
    document.body.className = 'details';

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.apiService.getFeedback(id).subscribe((feedback) => {
      if (feedback) {
        let numberOfCommentsCount = 0;

        this.feedback = feedback;
        if (feedback.comments) {
          feedback.comments.forEach((comment) => {
            numberOfCommentsCount++;

            if (comment.replies)
              numberOfCommentsCount =
                numberOfCommentsCount + comment.replies.length;
          });
        }

        this.numberOfComments = numberOfCommentsCount;
      }
    });
  }

  handleTextChange(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    this.text = target.value;
  }

  comment() {
    const postId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.apiService.comment(postId, this.text);

    this.text = '';
  }
}

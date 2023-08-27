import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Feedback } from 'src/app/types/option';

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.sass'],
})
export class EditFeedbackComponent implements OnInit {
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
    document.body.className = 'create';

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.apiService.getFeedback(id).subscribe((feedback) => {
      this.feedback = feedback;
    });
  }
}

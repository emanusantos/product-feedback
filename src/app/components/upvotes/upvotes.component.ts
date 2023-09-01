import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upvotes',
  templateUrl: './upvotes.component.html',
  styleUrls: ['./upvotes.component.sass'],
})
export class UpvotesComponent {
  @Input() id = '';
  @Input() isUpvoted = false;
  @Input() numberOfUpvotes = 0;

  constructor(private apiService: ApiService) {}

  upvote() {
    this.isUpvoted = true;

    // this.apiService.upvote(this.id);
  }

  getIcon() {
    return this.isUpvoted
      ? '../../../assets/shared/icon-arrow-up.svg'
      : '../../../assets/shared/icon-arrow-up-purple.svg';
  }
}

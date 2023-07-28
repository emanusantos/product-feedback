import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upvotes',
  templateUrl: './upvotes.component.html',
  styleUrls: ['./upvotes.component.sass'],
})
export class UpvotesComponent {
  @Input() numberOfUpvotes = 0;
}

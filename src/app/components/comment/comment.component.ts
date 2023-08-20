import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/types/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass'],
})
export class CommentComponent {
  @Input() comment: Omit<Comment, 'id'> = {
    content: '',
    user: {
      image: '',
      name: '',
      username: '',
    },
  };

  @Input() mention = '';

  @Input() hasSeparator = false;
}

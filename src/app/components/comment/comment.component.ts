import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Comment } from 'src/app/types/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass'],
})
export class CommentComponent {
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  @Input() comment: Omit<Comment, 'id'> & { id?: number } = {
    id: 0,
    content: '',
    user: {
      image: '',
      name: '',
      username: '',
    },
  };

  @Input() mention = '';

  @Input() hasSeparator = false;
  @Input() isReplyFormVisible = false;
  @Input() replyValue = '';
  @Input() parentComment? = 0;

  toggleReplyForm() {
    this.isReplyFormVisible = !this.isReplyFormVisible;
  }

  changeReplyValue(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    this.replyValue = target.value;
  }

  reply(commentId: number, replyingTo: string) {
    const postId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.apiService.reply({
      postId,
      commentId: commentId || this.parentComment || 0,
      input: {
        replyingTo,
        content: this.replyValue,
      },
    });

    this.replyValue = '';
    this.isReplyFormVisible = false;
  }
}

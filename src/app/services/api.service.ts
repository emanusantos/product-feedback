import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  lastValueFrom,
  map,
  throwError,
} from 'rxjs';

import { Option } from '../types/option';

import { CommentReply } from '../types/comment';
import { HttpClient } from '@angular/common/http';
import { CreateFeedback, Feedback } from '../types/feedback';

const url = 'http://localhost:8080/feedback';

@Injectable({ providedIn: 'root' })
export class ApiService {
  upvotes: number[] = [];

  dataSource: BehaviorSubject<Array<Feedback>> = new BehaviorSubject(
    [] as Array<Feedback>
  );

  selectedFeedback: BehaviorSubject<Feedback> = new BehaviorSubject({
    id: '',
    category: '',
    comments: [],
    description: '',
    status: '',
    title: '',
    upvotes: 0,
  });

  constructor(private readonly client: HttpClient) {
    this.fetchFeedbacks();
  }

  async fetchFeedbacks() {
    return this.client
      .get<Array<Feedback>>(url)
      .subscribe((res) => this.dataSource.next(res));
  }

  setFilter(filter: string) {
    const data = this.dataSource.getValue();

    // this.dataSource.next(
    //   data.productRequests.filter((item) =>
    //     handleFilter(item, filter.toLowerCase())
    //   )
    // );
  }

  setSort(sort: Option) {
    const data = this.dataSource.getValue();

    // this.filteredDataSource.next(
    //   data.productRequests.sort((a, b) => handleSort(a, b, sort))
    // );
  }

  upvote(id: number) {
    // const data = this.filteredDataSource.getValue();

    this.upvotes.push(id);

    // const itemIndex = data.findIndex((item) => item.id === id);

    // data[itemIndex] = {
    //   ...data[itemIndex],
    //   upvotes: data[itemIndex].upvotes + 1,
    //   isUpvoted: true,
    // };

    // this.filteredDataSource.next(data);
  }

  getFeedback(id: string, callback?: () => void) {
    return this.client.get<Feedback>(`${url}/${id}`).subscribe((res) => {
      this.selectedFeedback.next(res);
      if (callback) callback();
    });
  }

  comment(postId: number, content: string) {
    // const user = this.dataSource.getValue().currentUser;
    // const data = this.filteredDataSource.getValue();
    // const itemIndex = data.findIndex((item) => item.id === postId);
    // if (!data[itemIndex].comments || !data[itemIndex].comments!.length) {
    //   data[itemIndex].comments = [
    //     {
    //       id: 10,
    //       user,
    //       content,
    //     },
    //   ];
    // } else {
    //   const comments = data[itemIndex].comments!;
    //   const lastCommentIndex = comments[comments.length - 1];
    //   data[itemIndex].comments = [
    //     ...data[itemIndex].comments!,
    //     {
    //       id: lastCommentIndex.id + 1,
    //       user,
    //       content,
    //     },
    //   ];
    // }
    // this.filteredDataSource.next(data);
  }

  reply({
    postId,
    commentId,
    input,
  }: {
    postId: number;
    commentId: number;
    input: Omit<CommentReply, 'user'>;
  }) {
    // const user = this.dataSource.getValue().currentUser;
    // const data = this.filteredDataSource.getValue();
    // const itemIndex = data.findIndex((item) => item.id === postId);
    // if (!data[itemIndex].comments) return;
    // const commentIndex = data[itemIndex].comments!.findIndex(
    //   (item) => item.id === commentId
    // );
    // if (!data[itemIndex].comments![commentIndex].replies) {
    //   data[itemIndex].comments![commentIndex].replies = [{ ...input, user }];
    // } else {
    //   data[itemIndex].comments![commentIndex].replies = [
    //     ...data[itemIndex].comments![commentIndex].replies!,
    //     { ...input, user },
    //   ];
    // }
    // this.filteredDataSource.next(data);
  }

  addFeedback(feedback: CreateFeedback) {
    return this.client
      .post(url, feedback)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => new Error(err));
        })
      )
      .subscribe(() => {
        this.fetchFeedbacks();
      });
  }

  editFeedback(feedback: Partial<Feedback>) {
    if (!feedback.id) return;

    return this.client
      .patch(`${url}/${feedback.id}`, feedback)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => new Error(err));
        })
      )
      .subscribe(() => {
        this.getFeedback(feedback.id!);
        this.fetchFeedbacks();
      });
  }
}

import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, lastValueFrom, map, of } from 'rxjs';

import * as mock from 'assets/data.json';

import { Option } from '../types/option';

import { handleFilter, handleSort } from '../helpers/array-utils.helper';
import { CommentReply } from '../types/comment';
import { Feedback } from '../models/feedback.model';

type ProductRequests = Array<
  (typeof mock.productRequests)[number] & { isUpvoted?: boolean }
>;

@Injectable({ providedIn: 'root' })
export class ApiService {
  upvotes: number[] = [];

  dataSource: BehaviorSubject<typeof mock> = new BehaviorSubject({
    currentUser: {
      image: '',
      name: '',
      username: '',
    },
    productRequests: [] as typeof mock.productRequests & {
      isUpvoted?: boolean;
    },
  });

  filteredDataSource: BehaviorSubject<ProductRequests> = new BehaviorSubject(
    [] as ProductRequests
  );

  currentData = this.dataSource.asObservable();
  filteredData = this.filteredDataSource.asObservable();

  constructor() {
    this.fetchJSON();
  }

  fetchJSON() {
    lastValueFrom(of(mock).pipe(delay(500))).then((data) => {
      this.dataSource.next(data);
      this.filteredDataSource.next(data.productRequests);
    });
  }

  setFilter(filter: string) {
    const data = this.dataSource.getValue();

    this.filteredDataSource.next(
      data.productRequests.filter((item) =>
        handleFilter(item, filter.toLowerCase())
      )
    );
  }

  setSort(sort: Option) {
    const data = this.dataSource.getValue();

    this.filteredDataSource.next(
      data.productRequests.sort((a, b) => handleSort(a, b, sort))
    );
  }

  upvote(id: number) {
    const data = this.filteredDataSource.getValue();

    this.upvotes.push(id);

    const itemIndex = data.findIndex((item) => item.id === id);

    data[itemIndex] = {
      ...data[itemIndex],
      upvotes: data[itemIndex].upvotes + 1,
      isUpvoted: true,
    };

    this.filteredDataSource.next(data);
  }

  getFeedback(id: number) {
    return this.filteredDataSource.pipe(
      map((data) => data.find((feedback) => feedback.id === id)!)
    );
  }

  comment(postId: number, content: string) {
    const user = this.dataSource.getValue().currentUser;
    const data = this.filteredDataSource.getValue();

    const itemIndex = data.findIndex((item) => item.id === postId);

    if (!data[itemIndex].comments || !data[itemIndex].comments!.length) {
      data[itemIndex].comments = [
        {
          id: 10,
          user,
          content,
        },
      ];
    } else {
      const comments = data[itemIndex].comments!;
      const lastCommentIndex = comments[comments.length - 1];

      data[itemIndex].comments = [
        ...data[itemIndex].comments!,
        {
          id: lastCommentIndex.id + 1,
          user,
          content,
        },
      ];
    }

    this.filteredDataSource.next(data);
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
    const user = this.dataSource.getValue().currentUser;
    const data = this.filteredDataSource.getValue();

    const itemIndex = data.findIndex((item) => item.id === postId);

    if (!data[itemIndex].comments) return;

    const commentIndex = data[itemIndex].comments!.findIndex(
      (item) => item.id === commentId
    );

    if (!data[itemIndex].comments![commentIndex].replies) {
      data[itemIndex].comments![commentIndex].replies = [{ ...input, user }];
    } else {
      data[itemIndex].comments![commentIndex].replies = [
        ...data[itemIndex].comments![commentIndex].replies!,
        { ...input, user },
      ];
    }

    this.filteredDataSource.next(data);
  }

  addFeedback(feedback: Feedback) {
    let data = this.filteredDataSource.getValue();

    const lastFeedback = data[data.length - 1];

    data = [
      {
        id: lastFeedback.id + 1,
        category: feedback.category,
        description: feedback.description,
        status: 'suggestion',
        title: feedback.title,
        upvotes: 0,
        comments: [],
      },
      ...data,
    ];

    this.filteredDataSource.next(data);
  }

  editFeedback(feedback: Feedback) {
    if (!feedback.id) return;

    let data = this.filteredDataSource.getValue();

    const itemIndex = data.findIndex((item) => item.id === feedback.id);

    data[itemIndex] = {
      ...data[itemIndex],
      title: feedback.title,
      category: feedback.category.toLowerCase(),
      status: feedback.status!.toLowerCase(),
      description: feedback.description,
    };

    this.filteredDataSource.next(data);
  }
}

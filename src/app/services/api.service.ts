import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, lastValueFrom, map, of } from 'rxjs';

import * as mock from 'assets/data.json';

import { Option } from '../types/option';

import { handleFilter, handleSort } from '../helpers/array-utils.helper';

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
    return this.dataSource.pipe(
      map(
        (data) => data.productRequests.find((feedback) => feedback.id === id)!
      )
    );
  }
}

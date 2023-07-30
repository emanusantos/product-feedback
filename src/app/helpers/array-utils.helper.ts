import * as mock from 'assets/data.json';

import { Option } from '../types/option';

type ProductRequests = typeof mock.productRequests;

export function handleSort(
  a: ProductRequests[number],
  b: ProductRequests[number],
  sort: Option
) {
  const sortByParameter = {
    upvotes: (a: ProductRequests[number], b: ProductRequests[number]) => {
      if (sort.order === 'DESC') {
        return a.upvotes < b.upvotes ? 1 : -1;
      }

      return a.upvotes > b.upvotes ? 1 : -1;
    },
    comments: (a: ProductRequests[number], b: ProductRequests[number]) => {
      if (sort.order === 'DESC') {
        return Number(a.comments?.length) < Number(b.comments?.length) ? 1 : -1;
      }

      return Number(a.comments?.length) > Number(b.comments?.length) ? 1 : -1;
    },
  };

  return sortByParameter[sort.value](a, b);
}

export function handleFilter(
  item: (typeof mock.productRequests)[number],
  filter: string
) {
  if (filter === 'all') return true;

  return item.category === filter;
}

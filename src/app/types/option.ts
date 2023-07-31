import * as mock from 'assets/data.json';

export type Feedback = (typeof mock.productRequests)[number];

export type Option = {
  label: string;
  value: 'upvotes' | 'comments';
  order: 'ASC' | 'DESC';
};

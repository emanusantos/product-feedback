export interface CreateFeedback {
  title: string;
  description: string;
  category: string;
}

export interface Feedback extends CreateFeedback {
  id: string;
  status: string;
  upvotes: number;
  comments: [];
}

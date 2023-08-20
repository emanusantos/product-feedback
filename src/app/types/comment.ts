export type CommentUser = {
  image: string;
  name: string;
  username: string;
};

export type CommentReply = {
  content: string;
  replyingTo: string;
  user: CommentUser;
};

export type Comment = {
  id: number;
  content: string;
  user: CommentUser;
  replies?: Array<CommentReply>;
};

export interface Feedback {
    _id: string;
    userId: {
      _id: string;
      username: string;
    } | null;
    movieId: string;
    command: string;
  }
  
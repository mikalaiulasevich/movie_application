export interface IMovieResponse {
  readonly id: string;
  readonly original_title: string;
  readonly original_language: string;
  readonly poster_path: string;
  readonly backdrop_path: string;
  readonly title: string;
  readonly overview: string;
  readonly release_date: string;
  readonly popularity: number;
  readonly vote_average: number;
  readonly vote_count: number;
  readonly genre_ids: Array<number>;
}

export interface IMoviesResponse {
  readonly page: number;
  readonly results: Array<IMovieResponse>;
}

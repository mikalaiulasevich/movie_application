import {Model} from '@nozbe/watermelondb';

export interface IMovie extends Model {
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_count: number;
  vote_average: number;
  popularity: number;
  release_date: string;
  genres: string;

  local_poster_path: Nullable<string>;
  local_backdrop_path: Nullable<string>;
}

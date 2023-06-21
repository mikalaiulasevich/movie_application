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
  text: string;
  genres: string;
}

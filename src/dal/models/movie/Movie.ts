import {Model, TableName} from '@nozbe/watermelondb';

import {field, readonly} from '@nozbe/watermelondb/decorators';

import {TABLE_NAMES} from '@organic/dal/Tables';

import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';

// Database model of Movie
export class Movie extends Model implements IMovie {
  public static table: TableName<Model> = TABLE_NAMES.MOVIE;

  @field('original_language')
  @readonly
  public original_language: string;

  @field('original_title')
  @readonly
  public original_title: string;

  @field('release_date')
  @readonly
  public release_date: string;

  @field('overview')
  @readonly
  public overview: string;

  @field('poster_path')
  @readonly
  public poster_path: string;

  @field('local_poster_path')
  @readonly
  public local_poster_path: Nullable<string>;

  @field('backdrop_path')
  @readonly
  public backdrop_path: string;

  @field('local_backdrop_path')
  @readonly
  public local_backdrop_path: Nullable<string>;

  @field('vote_count')
  @readonly
  public vote_count: number;

  @field('vote_average')
  @readonly
  public vote_average: number;

  @field('popularity')
  @readonly
  public popularity: number;

  @field('genres')
  @readonly
  public genres: string;
}

import {ColumnSchema} from '@nozbe/watermelondb/Schema';

// Schema for Movie model.
export const MovieSchema: Array<ColumnSchema> = [
  // IMovie
  {
    name: 'original_language',
    type: 'string',
  },
  {
    name: 'original_title',
    type: 'string',
  },
  {
    name: 'overview',
    type: 'string',
  },
  {
    name: 'poster_path',
    type: 'string',
  },
  {
    name: 'backdrop_path',
    type: 'string',
  },
  {
    name: 'release_date',
    type: 'string',
  },
  {
    name: 'vote_count',
    type: 'number',
  },
  {
    name: 'vote_average',
    type: 'number',
  },
  {
    name: 'popularity',
    type: 'number',
  },
  {
    name: 'genres',
    type: 'string',
  },
  {
    name: 'local_poster_path',
    type: 'string',
    isOptional: true,
  },
  {
    name: 'local_backdrop_path',
    type: 'string',
    isOptional: true,
  },
];

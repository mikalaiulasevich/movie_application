import {appSchema, tableSchema} from '@nozbe/watermelondb';

import {TABLE_NAMES} from '@organic/dal/Tables';

import {MovieSchema} from '@organic/dal/schemas/MovieSchema';

export const Schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: TABLE_NAMES.MOVIE,
      columns: MovieSchema,
    }),
  ],
});

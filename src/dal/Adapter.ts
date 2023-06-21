import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {Schema} from '@organic/dal/Schema';

export const Adapter: SQLiteAdapter = new SQLiteAdapter({
  schema: Schema,
});

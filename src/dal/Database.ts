import {Database as WatermelonDatabase} from '@nozbe/watermelondb';

import {Adapter} from '@organic/dal/Adapter';

import {Movie} from '@organic/dal/models/movie/Movie';

export const Database = new WatermelonDatabase({
  adapter: Adapter,
  modelClasses: [Movie],
});

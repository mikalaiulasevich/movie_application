import {Collection} from '@nozbe/watermelondb';

import {Database} from '@organic/dal/Database';

import {TABLE_NAMES} from '@organic/dal/Tables';

import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';

type DatabaseCollections = {
  readonly movies: Collection<IMovie>;
  readonly db: typeof Database;
};

// Hook to retrieve db instance and theirs collections.
export function useDatabaseCollections(): DatabaseCollections {
  return {
    movies: Database.collections.get<IMovie>(TABLE_NAMES.MOVIE),
    db: Database,
  };
}

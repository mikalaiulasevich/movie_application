import React from 'react';

import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import find from 'lodash/find';

import {useDatabaseCollections} from '@organic/dal/hooks/useDatabaseCollections';

import {getGenres} from '@organic/connectivity/api/genres';
import {getMovies} from '@organic/connectivity/api/movies';

import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';

type BootstrapState = {
  readonly isLoading: boolean;
};

// Hook to get initial data for use application at entry level.
export function useBootstrap(): BootstrapState {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const {db, movies} = useDatabaseCollections();

  React.useEffect(() => {
    (async () => {
      try {
        const [genresResponse, moviesResponse] = await Promise.all([
          getGenres(),
          getMovies(1),
        ]);

        // Ugly solution, but it fast way to save data without model.
        // Also i call it all time when we start up. Because new genres can be applied in future.
        // TODO: Move to own Model.
        await db.localStorage.set('genres', JSON.stringify(genresResponse));

        /**
         *  Its a value of last loaded page on movie list view.
         *  This seems normal because its fast and safe place to save some meta info.
         *  And its live same with db. If db die this meta also will deleted.
         */
        const pageLoaded: string | void = await db.localStorage.get<string>(
          'PAGE_LOADED',
        );

        // This bootstrap needs to us only once. And if we already has some data to see. We doesnt need to fetch it here.
        if (pageLoaded && Number(pageLoaded) >= 1) {
          setIsLoading(false);

          return;
        }

        await db.write(async () => {
          // Array for batch creation.
          const entitiesToSave = [];

          for await (const movie of moviesResponse.data.results) {
            // All genres of current movie.
            const allGenresOfMovie = map(
              map(movie.genre_ids, id =>
                find(genresResponse.data.genres, gr => isEqual(gr.id, id)),
              ),
              g => (g && g.name) || '',
            );

            const movieToSave: IMovie = await movies.prepareCreate(_movie => {
              _movie.original_language = movie.original_language;
              _movie.original_title = movie.original_title;
              _movie.overview = movie.overview;
              _movie.poster_path = movie.poster_path;
              _movie.backdrop_path = movie.backdrop_path;
              _movie.popularity = movie.popularity;
              _movie.vote_count = movie.vote_count;
              _movie.vote_average = movie.vote_average;
              _movie.release_date = movie.release_date;
              _movie.genres = allGenresOfMovie.toString();
            });

            entitiesToSave.push(movieToSave);
          }

          await db.batch(...entitiesToSave);

          /**
           * After we load and save movies increment counter, this solution is error safe,
           * because if some exception throws increment will not incremented.
           */
          await db.localStorage.set('PAGE_LOADED', 1);
        });
      } catch (e) {
        //TODO: Add exception handler.
      } finally {
        // Finally remove loader from bootstrap button and provide ability to go next.
        // TODO: A little delay for demonstrate radial loader on button.
        setTimeout(() => setIsLoading(false), 3500);
      }
    })();
  }, []);

  return {
    isLoading,
  };
}

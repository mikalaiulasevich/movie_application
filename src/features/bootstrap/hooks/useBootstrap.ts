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

export function useBootstrap(): BootstrapState {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const {db, movies} = useDatabaseCollections();

  React.useEffect(() => {
    (async () => {
      const [genresResponse, moviesResponse] = await Promise.all([
        getGenres(),
        getMovies(1),
      ]);

      await db.localStorage.set('genres', JSON.stringify(genresResponse));

      const pageLoaded: string | void = await db.localStorage.get<string>(
        'PAGE_LOADED',
      );

      if (pageLoaded && Number(pageLoaded) >= 1) {
        setIsLoading(false);

        return;
      }

      await db.write(async () => {
        const entitiesToSave = [];

        for await (const movie of moviesResponse.data.results) {
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

        await db.localStorage.set('PAGE_LOADED', 1);
      });

      setIsLoading(false);
    })();
  }, []);

  return {
    isLoading,
  };
}

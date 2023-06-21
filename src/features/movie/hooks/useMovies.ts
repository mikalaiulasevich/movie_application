import React from 'react';

import {AxiosResponse} from 'axios';

import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import find from 'lodash/find';

import {useDatabaseCollections} from '@organic/dal/hooks/useDatabaseCollections';

import {getMovies} from '@organic/connectivity/api/movies';

import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';
import {IGenresResponse} from '@organic/connectivity/dto/IGenresResponse';

type MoviesState = {
  readonly isLoading: boolean;
  readonly getNewMovies: () => void;
};

// TODO;: It can be refactored and used with useBootstrap. A lot of boilerplate. More about this hook read at useBootstrap.
export function useMovies(): MoviesState {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {db, movies} = useDatabaseCollections();

  const getNewMovies = React.useCallback(async () => {
    try {
      const pageLoaded: string | void = await db.localStorage.get<string>(
        'PAGE_LOADED',
      );

      const pageNumber: number = Number(pageLoaded);

      if (isLoading) {
        return;
      }

      setIsLoading(true);

      const [genresResponsePersistence, moviesResponse] = await Promise.all([
        db.localStorage.get<string>('genres'),
        getMovies(pageNumber + 1),
      ]);

      const genresResponse: AxiosResponse<IGenresResponse> = JSON.parse(
        genresResponsePersistence || '',
      );

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

        await db.localStorage.set('PAGE_LOADED', pageNumber + 1);
      });
    } catch (e) {
      //TODO: Add exception handler.
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getNewMovies,
    isLoading,
  };
}

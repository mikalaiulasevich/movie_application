import {AxiosResponse} from 'axios';

import {HttpClient} from '@organic/connectivity/client';

import {IMoviesResponse} from '@organic/connectivity/dto/IMovieResponse';

// Pure function used to load movies from api. Has page parameter.
export async function getMovies(
  page: number,
): Promise<AxiosResponse<IMoviesResponse>> {
  return await HttpClient.get<IMoviesResponse>(
    `/movie/now_playing?language=en-US&page=${page}`,
  );
}

import {AxiosResponse} from 'axios';

import {HttpClient} from '@organic/connectivity/client';

import {IGenresResponse} from '@organic/connectivity/dto/IGenresResponse';

// Pure function used to load genres from api.

export async function getGenres(): Promise<AxiosResponse<IGenresResponse>> {
  return await HttpClient.get<IGenresResponse>('/genre/movie/list?language=en');
}

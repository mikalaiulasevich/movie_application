import {Platform} from 'react-native';

import ReactNativeBlobUtil from 'react-native-blob-util';

import {IMovie} from '@organic/dal/models/movie/interfaces/IMovie';

export async function getNetworkImage(
  url: string,
  name: string,
  quality: 'w500' | 'w1280' = 'w500',
): Promise<Nullable<string>> {
  try {
    // Save image to documents folder.
    const response = await ReactNativeBlobUtil.config({
      fileCache: true,
      overwrite: true,
      path: ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + name + '.jpg',
    }).fetch('GET', `https://image.tmdb.org/t/p/${quality}${url}`);

    return `${response.path()}`;
  } catch (error) {
    // TODO: Add handler
  }
}

// Helper to get local file url.
export function getLocalUrl(path: string) {
  return Platform.select({
    ios: path,
    android: `file://${path}`,
    default: path,
  });
}

// Return cached or http link to backdrop image
export function getBackdropImageSourceURIFromMovie(movie: IMovie): string {
  if (movie.local_backdrop_path) {
    return getLocalUrl(movie.local_backdrop_path);
  } else {
    return movie.backdrop_path;
  }
}

// Return cached or http link to poster image
export function getPosterImageSourceURIFromMovie(movie: IMovie): string {
  if (movie.local_poster_path) {
    return getLocalUrl(movie.local_poster_path);
  } else {
    return movie.poster_path;
  }
}

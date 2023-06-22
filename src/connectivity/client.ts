import Axios from 'axios';

const TOKEN: string = 'YOUR TMDB TOKEN';

// Impl of http client base on Axios solution
export const HttpClient = Axios.create({
  timeout: 5000,
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

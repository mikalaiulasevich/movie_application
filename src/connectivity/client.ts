import Axios from 'axios';

// TOKEN FOR TMDB TODO: DELETE and MOVE to ENV
const TOKEN: string =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTZlOTJmZmY1YzE4MDZiZTFkNDQ1YjNmNzg0M2E0YSIsInN1YiI6IjVhZTIyZjk3OTI1MTQxMjRjNDAxNzc2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IE-vxjowO_8blrEiT7xt2TrhIMuzYQxFv4tFXKA0lSA';

// Impl of http client base on Axios solution
export const HttpClient = Axios.create({
  timeout: 5000,
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

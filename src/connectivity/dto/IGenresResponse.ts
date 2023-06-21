export interface IGenreResponse {
  readonly id: number;
  readonly name: string;
}

export interface IGenresResponse {
  readonly genres: Array<IGenreResponse>;
}

export interface IPageable<T> {
  readonly page: number;
  readonly results: Array<T>;
}

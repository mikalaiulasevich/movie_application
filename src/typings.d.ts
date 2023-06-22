/*
    TypeSafe type for shorthand write.
 */

type Nullable<T> = T | null | undefined;

declare module '*.png' {
  const value: any;
  export default value;
}

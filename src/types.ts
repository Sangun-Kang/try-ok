export type Ok<T> = {
  isError: false;
  data: T;
};

export type Err<E = unknown> = {
  isError: true;
  error: E;
};

export type Result<T, E = unknown> = Ok<T> | Err<E>;

export const ok = <T>(data: T): Ok<T> => ({ isError: false, data });
export const err = <E>(error: E): Err<E> => ({ isError: true, error });

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> => !r.isError;
export const isErr = <T, E>(r: Result<T, E>): r is Err<E> => r.isError;

export const unwrap = <T, E, F = T>(result: Result<T, E>, fallback: F): T | F =>
  result.isError ? fallback : result.data;

import { ok, err, type Result } from "./types";

export async function tryOk<T, E = unknown>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return ok(data);
  } catch (error) {
    return err(error as E);
  }
}

export function tryOkSync<T, E = unknown>(fn: () => T): Result<T, E> {
  try {
    const data = fn();
    return ok(data);
  } catch (error) {
    return err(error as E);
  }
}


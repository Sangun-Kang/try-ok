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


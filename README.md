# try-ok

**Predictable, type-safe error handling for TypeScript.**
Stop throwing. Start returning.

## Motivation (Why I built this)

In my projects, I noticed that `try-catch` was creating more problems than it solved.

As our codebase grew, we faced the same issues repeatedly:

  * Inside `catch(e)`, the error is always `unknown`, so TypeScript can't help us.
  * `throw` breaks the control flow, making logic hard to follow.
  * It's easy to forget error handling when it's hidden in a `catch` block.

I wanted a way to write safer code without introducing a heavy framework. I needed something simple that treats errors as **values**, just like in Go or Rust.

That's why I created `try-ok`—to fix these habits with a tiny, zero-dependency tool.

## Installation

```bash
npm install try-ok
```

## Quick Start

```ts
import { tryOk } from "try-ok";

const result = await tryOk(fetch("/api/user").then(r => r.json()));

if (result.isError) {
  console.error(result.error);
  return;
}

console.log(result.data);
```

## API

### `tryOk(promise)` — Async

```ts
const result = await tryOk(fetchUser());
```

### `tryOkSync(fn)` — Sync

```ts
const result = tryOkSync(() => JSON.parse(jsonString));
```

### `unwrap(result, fallback)`

```ts
const user = unwrap(result, defaultUser);  // Returns data or fallback
```

### `ok(data)` / `err(error)` — Create Result directly

```ts
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return err("Division by zero");
  return ok(a / b);
}
```

### `isOk(result)` / `isErr(result)` — Type Guards

```ts
if (isOk(result)) { /* result.data available */ }
if (isErr(result)) { /* result.error available */ }
```

## Types

```ts
type Ok<T> = { isError: false; data: T };
type Err<E> = { isError: true; error: E };
type Result<T, E = unknown> = Ok<T> | Err<E>;
```

## Custom Error Types

```ts
type ApiError = { status: number; message: string };

const result = await tryOk<User, ApiError>(getUser());

if (result.isError) {
  console.log(result.error.status);  // TypeScript knows this is ApiError
}
```

## Why another library?

I actually found a lot of similar OSS!
Seems like developers everywhere have had the same idea haha.

Still, try-ok has a slightly different goal:
it focuses on stronger type safety and explicit error handling using a clean Result pattern.

If you prefer predictable control flow and safer TypeScript,
this library might fit your style.

---

MIT

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
npm install @sangun-kang/try-ok
```

## How to use

### The Problem (`try-catch`)

Using `try-catch` often leads to nested code and loose typing:

```ts
try {
  const data = await fetch("/api/user").then(r => r.json());
  // ...logic
} catch (error) {
  // ❌ What is 'error'? We don't know.
  // ❌ strict typing is lost here.
  console.error(error);
}
```

### The Solution (`try-ok`)

With `try-ok`, you handle errors explicitly as return values:

```ts
import { tryResult } from "@sangun-kang/try-ok";

const result = await tryResult(fetch("/api/user").then(r => r.json()));

// 1. Handle Error First (Type Guard)
if (result.isError) {
  console.error(result.error); // Typed as unknown (or your custom type)
  return;
}

// 2. Safe to proceed
// 'result.data' is now guaranteed to be valid
console.log(result.data);
```

`try-ok` works well inside React components, especially when calling an existing async function:

```tsx
import { tryResult } from "@sangun-kang/try-ok";

export default async function Page() {
  const result = await tryResult(getData());

  if (result.isError) {
    return <div>Oops!</div>;
  }

  return <div>I'm so happy</div>;
}
```

-----

## Types

The implementation is minimal. No magic.

```ts
export type Ok<T> = { isError: false; data: T };
export type Err<E> = { isError: true; error: E };
export type Result<T, E = unknown> = Ok<T> | Err<E>;
```

## Custom Error Types

You can strictly type your errors if needed:

```ts
type ApiError = { status: number; message: string };

const result = await tryResult<User, ApiError>(getUser());

if (result.isError) {
  // TypeScript knows this is ApiError
  console.log(result.error.status);
}
```

## Roadmap

  * Add `unwrap()` / `unwrapOr()` helpers
  * Add `mapError` utility
  * React hooks examples

-----

MIT

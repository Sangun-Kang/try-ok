import { describe, it, expect } from "vitest";
import { tryOk } from "./tryOk";
import { isOk, isErr } from "./types";

describe("tryOk", () => {
	it("should return Ok result when promise resolves", async () => {
		const promise = Promise.resolve(42);
		const result = await tryOk(promise);

		expect(isOk(result)).toBe(true);
		if (isOk(result)) {
			expect(result.data).toBe(42);
			expect(result.isError).toBe(false);
		}
	});

	it("should return Err result when promise rejects", async () => {
		const error = new Error("Test error");
		const promise = Promise.reject(error);
		const result = await tryOk(promise);

		expect(isErr(result)).toBe(true);
		if (isErr(result)) {
			expect(result.error).toBe(error);
			expect(result.isError).toBe(true);
		}
	});

	it("should handle string errors", async () => {
		const error = "String error";
		const promise = Promise.reject(error);
		const result = await tryOk<string, string>(promise);

		expect(isErr(result)).toBe(true);
		if (isErr(result)) {
			expect(result.error).toBe(error);
		}
	});

	it("should handle object data", async () => {
		const data = { name: "test", value: 123 };
		const promise = Promise.resolve(data);
		const result = await tryOk(promise);

		expect(isOk(result)).toBe(true);
		if (isOk(result)) {
			expect(result.data).toEqual(data);
		}
	});

	it("should handle null and undefined", async () => {
		const nullResult = await tryOk(Promise.resolve(null));
		expect(isOk(nullResult)).toBe(true);
		if (isOk(nullResult)) {
			expect(nullResult.data).toBeNull();
		}

		const undefinedResult = await tryOk(Promise.resolve(undefined));
		expect(isOk(undefinedResult)).toBe(true);
		if (isOk(undefinedResult)) {
			expect(undefinedResult.data).toBeUndefined();
		}
	});
});


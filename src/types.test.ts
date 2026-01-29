import { describe, it, expect } from "vitest";
import { ok, err, isOk, isErr, unwrap, type Result } from "./types";

describe("types utilities", () => {
	describe("ok", () => {
		it("should create Ok result", () => {
			const result = ok(42);
			expect(result.isError).toBe(false);
			expect(result.data).toBe(42);
		});
	});

	describe("err", () => {
		it("should create Err result", () => {
			const error = new Error("Test");
			const result = err(error);
			expect(result.isError).toBe(true);
			expect(result.error).toBe(error);
		});
	});

	describe("isOk", () => {
		it("should return true for Ok result", () => {
			const result = ok(42);
			expect(isOk(result)).toBe(true);
		});

		it("should return false for Err result", () => {
			const result = err("error");
			expect(isOk(result)).toBe(false);
		});

		it("should narrow type correctly", () => {
			const result: Result<number, string> = ok(42);
			if (isOk(result)) {
				// TypeScript should know result.data exists here
				expect(result.data).toBe(42);
			}
		});
	});

	describe("isErr", () => {
		it("should return true for Err result", () => {
			const result = err("error");
			expect(isErr(result)).toBe(true);
		});

		it("should return false for Ok result", () => {
			const result = ok(42);
			expect(isErr(result)).toBe(false);
		});

		it("should narrow type correctly", () => {
			const result: Result<number, string> = err("error");
			if (isErr(result)) {
				// TypeScript should know result.error exists here
				expect(result.error).toBe("error");
			}
		});
	});

	describe("unwrap", () => {
		it("should return data for Ok result", () => {
			const result = ok(42);
			expect(unwrap(result, 0)).toBe(42);
		});

		it("should return fallback for Err result", () => {
			const result = err("error");
			expect(unwrap(result, 0)).toBe(0);
		});

		it("should allow different fallback type", () => {
			const result: Result<number, string> = err("error");
			const value = unwrap(result, "fallback");
			expect(value).toBe("fallback");
		});

		it("should work with object data", () => {
			const data = { name: "test", value: 123 };
			const fallback = { name: "fallback", value: 0 };
			const okResult = ok(data);
			const errResult: Result<typeof data, string> = err("error");

			expect(unwrap(okResult, fallback)).toEqual(data);
			expect(unwrap(errResult, fallback)).toEqual(fallback);
		});

		it("should handle null and undefined fallback", () => {
			const result: Result<number, string> = err("error");
			expect(unwrap(result, null)).toBeNull();
			expect(unwrap(result, undefined)).toBeUndefined();
		});
	});
});


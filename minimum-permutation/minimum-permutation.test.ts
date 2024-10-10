import { describe, expect, test } from "vitest";
import { minPermutation } from "./minimum-permutation";

describe("Minimum Permutation", () => {
  test("Functionality Test", () => {
    const arr = [3, 1, 5];
    const set = new Set([4, 2]);
    expect(minPermutation(arr, set)).toStrictEqual([2, 3, 1, 4, 5]);
  });

  test("Benchmark - Execution Speed", () => {
    const arr = [3, 1, 5];
    const set = new Set([4, 2]);

    const iterations = 1000;
    let totalDuration = 0;

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      minPermutation(arr, set); // Use fresh copies if mutation occurs
      const end = performance.now();
      totalDuration += end - start;
    }

    const averageDuration = totalDuration / iterations;
    console.log("Average Execution Speed: ", averageDuration.toFixed(4), " ms");

    expect(averageDuration).toBeLessThan(1000); // Example threshold
  });

  test("Benchmark - Memory usage", () => {
    const arr = [3, 1, 5];
    const set = new Set([4, 2]);

    const before = process.memoryUsage().heapUsed;

    const result = minPermutation(arr, set);

    const after = process.memoryUsage().heapUsed;

    const memoryUsed = ((after - before) / 1024 / 1024).toFixed(4); // Memory used in MB
    console.log("Memory Used: ", memoryUsed, " MB");

    expect(Number(memoryUsed)).toBeLessThan(256);
  });
});

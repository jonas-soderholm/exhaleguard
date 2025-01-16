// Hero.test.tsx
import { add, sumTwoAdds } from "../practice";
import "@testing-library/jest-dom/extend-expect";

describe("add function", () => {
  it("should return the sum of two numbers", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });
});

describe("sumTwoAdds function", () => {
  it("should return the sum of two numbers plus a static number", () => {
    expect(sumTwoAdds(1, 2)).toBe(8); // 1 + 2 + 5
    expect(sumTwoAdds(-1, 1)).toBe(5); // -1 + 1 + 5
    expect(sumTwoAdds(0, 0)).toBe(5); // 0 + 0 + 5
  });
});

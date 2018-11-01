import Rect from "../src/struct/Rect";

describe("Rect", () => {
  it("creates a rectangle", () => {
    const r = new Rect(10, 20, 10, 20);
    expect(r.get()).toMatchObject([10, 20, 10, 20]);
  });

  it("cannot create an impossible shape", () => {
    expect(() => new Rect(10, 8, 10, 20)).toThrow();
    expect(() => new Rect(10, 20, 10, 2)).toThrow();
  });

  it("calculates the width", () => {
    const r = new Rect(10, 20, 10, 20);
    expect(r.width()).toBe(10);
  });

  it("calculates the height", () => {
    const r = new Rect(10, 20, 0, 20);
    expect(r.height()).toBe(20);
  });

  it("calculates the area", () => {
    const r = new Rect(10, 20, 10, 20);
    expect(r.area()).toBe(100);
  });

  it("can be reset", () => {
    const r = new Rect(10, 20, 10, 20);
    r.set(1, 2, 1, 2, 1, 2);
    expect(r.get()).toMatchObject([1, 2, 1, 2]);
  });
});

import TPyramid from "../src//TPyramid";
import Rect from "../src/struct/Rect";

describe("TPyramid", () => {
  it("creates a struct with a rect of bounds", () => {
    const tp = new TPyramid(new Rect(10, 20, 10, 20));
    expect(tp.bounds.get()).toMatchObject([10, 20, 10, 20]);
  });

  it("cannot add an out of bounds point but returns", () => {
    const tp = new TPyramid(new Rect(10, 20, 10, 20));
    expect(() => tp.addPoint([1, 2])).not.toThrow();
  });

  it("can add points up to the density", () => {
    const tp = new TPyramid(new Rect(10, 20, 10, 20));
    tp.addPoint([15, 15]);
    expect(tp.points.length).toBe(1);
    expect(tp.children.length).toBe(0);
  });

  it("subdivides once the density is reached", () => {
    const tp = new TPyramid(new Rect(10, 20, 10, 20));
    tp.addPoint([12, 12]);
    tp.addPoint([18, 18]);
    expect(tp.children.length).toBe(4);
    expect(tp.children[0].points[0]).toMatchObject([12, 12]);
    expect(tp.children[3].points[0]).toMatchObject([18, 18]);
  });

  it("cannot add two points in the same place", () => {
    const tp = new TPyramid(new Rect(10, 20, 10, 20));
    tp.addPoint([12, 12]);
    tp.addPoint([12, 12]);
    expect(tp.points.length).toBe(1);
  });

  it("unsubdivides once the density is reduced", () => {
    const tp = new TPyramid(new Rect(10, 20, 10, 20));
    const point: [number, number] = [18, 18];
    tp.addPoint([12, 12]);
    tp.addPoint(point);
    tp.deletePoint(point);
    expect(tp.children.length).toBe(0);
    expect(tp.points.length).toBe(1);
    expect(tp.points[0]).toMatchObject([12, 12]);
  });
});

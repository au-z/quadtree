import Quadtree from "../src/Quadtree";

describe("Quadtree", () => {
  it("Is a class", () => {
    const qt = new Quadtree('#quadtree', {dim: 200, render: false}]);
  });
});

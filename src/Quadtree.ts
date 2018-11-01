import Rect from "./struct/Rect";
import TPyramid from "./TPyramid";

export default class Quadtree {
  public dims: [number, number];
  public points: Array<[number, number]>;
  private root: TPyramid;

  constructor(dims: [number, number]) {
    console.log("New quadtree:", dims);
    this.root = new TPyramid(new Rect(0, dims[0], 0, dims[1]), 1);
  }

  public addPoint(point: [number, number]) {
    this.points.push(point);
    this.root.addPoint(point);
  }
}

import Rect from "./struct/Rect";
import { emitRedraw } from './render/TPyramidRenderer';
type Point = [number, number];

export default class TPyramid {
  public index: string;
  public bounds: Rect;
  public points: Array<Point> = [];
  public children: Array<TPyramid> = [];
  private density: number;

  constructor(bounds: Rect, density: number = 1, index: string) {
    this.bounds = bounds;
    this.density = density;
    this.index = index;
  }

  public addPoint(point: Point) {
    if (this.children.length > 0) {
      this.children.forEach(c => c.addPoint(point));
      return;
    } else {
      if (!this.isInBounds(this.bounds, point) || !this.isUniquePoint(point))
        return;

      this.points.push(point);
      if (this.points.length > this.density && this.children.length === 0) {
        this.subd();
        return emitRedraw(this);
      }
    }
    return emitRedraw(this);
  }

  public deletePoint(point: Point) {
    if (this.children.length > 0) {
      const remaining = this.children.reduce((points, c) => {
        points.push(...c.deletePoint(point));
        return points;
      }, []);

      if (remaining.length <= this.density) {
        this.points = remaining;
        this.unsubd();
      }
    } else {
      const idx = this.points.findIndex(p => p === point);
      if (idx >= 0) {
        this.points.splice(idx, 1);
      }

      return this.points;
    }
    emitRedraw(this);
  }

  private subd() {
    const w = this.bounds.width() / 2;
    const h = this.bounds.height() / 2;
    const b = this.bounds.get();

    const lw = b[0];
    const mw = b[0] + w;
    const rw = b[1];
    const th = b[2];
    const mh = b[2] + h;
    const bh = b[3];

    this.children.push(new TPyramid(new Rect(lw, mw, th, mh), this.density, `${this.index}.0`));
    this.children.push(new TPyramid(new Rect(mw, rw, th, mh), this.density, `${this.index}.1`));
    this.children.push(new TPyramid(new Rect(lw, mw, mh, bh), this.density, `${this.index}.2`));
    this.children.push(new TPyramid(new Rect(mw, rw, mh, bh), this.density, `${this.index}.3`));

    this.children.forEach(c => this.points.forEach(p => c.addPoint(p)));
    this.points = [];
  }

  private unsubd() {
    this.children = [];
    // emitRedraw(this.index);
  }

  private isUniquePoint(point: Point) {
    return this.points.every(p => !(p[0] === point[0] && p[1] === point[1]));
  }

  private isInBounds(bounds: Rect, point: Point): boolean {
    const b = bounds.get();
    const p = point;
    return b[1] >= p[0] && b[0] <= p[0] && b[3] >= p[1] && b[2] <= p[1];
  }
}

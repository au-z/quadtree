export default class Rect {
  public corners: Array<number>;

  constructor(tl: number, tr: number, bl: number, br: number) {
    if (tr - tl < 0) {
      throw new Error("Cannot create Rect with negative width.");
    }
    if (br - bl < 0) {
      throw new Error("Cannot create Rect with negative height.");
    }
    this.corners = [tl, tr, bl, br];
  }

  public get(): Array<number> {
    return this.corners;
  }

  public set(...corners: Array<number>) {
    this.corners = corners.slice(0, 4);
  }

  public width(): number {
    return this.corners[1] - this.corners[0];
  }

  public height(): number {
    return this.corners[3] - this.corners[2];
  }

  public area(): number {
    return this.width() * this.height();
  }
}

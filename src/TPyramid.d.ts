import Rect from "./struct/Rect";
declare type Point = [number, number];
export default class TPyramid {
    bounds: Rect;
    points: Array<Point>;
    children: Array<TPyramid>;
    private density;
    constructor(bounds: Rect, density?: number);
    addPoint(point: Point): void;
    deletePoint(point: Point): [number, number][];
    private subd;
    private unsubd;
    private isUniquePoint;
    private isInBounds;
}
export {};

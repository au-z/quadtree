export default class Rect {
    corners: Array<number>;
    constructor(tl: number, tr: number, bl: number, br: number);
    get(): Array<number>;
    set(...corners: Array<number>): void;
    width(): number;
    height(): number;
    area(): number;
}

declare class QuadtreeOptions {
    dim: number;
    density: number;
    render: boolean;
}
export default class Quadtree {
    dims: [number, number];
    points: Array<[number, number]>;
    private root;
    private renderer;
    constructor(selector: string, options: QuadtreeOptions);
    addPoint(point: [number, number]): void;
    render(): void;
}
export {};

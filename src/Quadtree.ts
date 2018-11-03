import Rect from "./struct/Rect";
import TPyramid from "./TPyramid";
import TPyramidRenderer from "./render/TPyramidRenderer";
import MouseEvents from  "./input/MouseEvents";

enum Interaction {
	Mouse = "mouse",
}

class QuadtreeOptions {
	public dim: number;
	public density?: number;
	public render?: boolean;
	public interaction?: Interaction;
}

export default class Quadtree {
	public dims: [number, number];
	public points: Array<[number, number]>;
	private root: TPyramid;
	private renderer: TPyramidRenderer;

	constructor(selector: string, options: QuadtreeOptions) {
		this.points = [];

		if(options.render === undefined) options.render = true
		if(options.density === undefined) options.density = 1
		if(options.interaction === undefined) options.interaction = Interaction.Mouse

		this.root = new TPyramid(new Rect(0, options.dim, 0, options.dim), options.density, '0');
		
		if(options.render) {
			this.renderer = new TPyramidRenderer(selector, this.root);
			new MouseEvents(this.renderer.rootEl, {
				mouseup: this.addPoint.bind(this),
			});
		}
	}

	public addPoint(point: [number, number]) {
		this.points.push(point);
		this.root.addPoint(point);
	}

	public render() {
		this.renderer = new TPyramidRenderer('#quadtree', this.root);
	}
}

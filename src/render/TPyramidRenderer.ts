import TPyramid from "src/TPyramid";
type Point = [number, number]

export const DRAW_EVENT: string = 'tpyramidrender.redraw.index'
export function emitRedraw(index: string) {
	const event = new CustomEvent(DRAW_EVENT, {
		detail: {
			index,
		},
	})
	document.dispatchEvent(event)
}

export default class TPyramidRenderer {
	public rootEl: HTMLElement
	private tree: TPyramid
	
	constructor(selector: string = 'quadtree', tree: TPyramid) {
		this.tree = tree;
		this.registerRootElement(selector);
		this.drawTree(this.rootEl, this.tree);
		// TODO
		document.addEventListener(DRAW_EVENT, (e) => {
			console.log(e);
		});
	}

	private registerRootElement(selector: string) {
		this.rootEl = document.querySelector(selector);
		if(!this.rootEl) throw new Error('Cannot find root element');
		this.rootEl.classList.add('quadtree')
		this.rootEl.style.width = `${this.tree.bounds.width()}px`
		this.rootEl.style.height = `${this.tree.bounds.height()}px`
	}

	private drawTree(el: HTMLElement, tree: TPyramid) {
		const node = document.createElement('div')
		node.classList.add('node')
		node.style.width = `${tree.bounds.width()}px`
		node.style.height = `${tree.bounds.height()}px`
		node.style.left = `${tree.bounds.corners[0]}px`
		node.style.top = `${tree.bounds.corners[2]}px`

		el.appendChild(node);
		if(tree.children.length > 0) {
			tree.children.forEach((c) => this.drawTree(node, c))
		}
		if(tree.points.length > 0) {
			tree.points.forEach((p) => this.drawPoint(node, p))
		}
	}

	private drawPoint(node: HTMLElement, point: Point) {
		const el = document.createElement('div')
		el.classList.add('point')
		el.style.left = `${point[0] - 2}px`
		el.style.top = `${point[1] - 2}px`
		node.appendChild(el)
	}
}
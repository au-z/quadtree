import TPyramid from "src/TPyramid";
type Point = [number, number];

const NodeEl = (tpyramid: TPyramid): HTMLElement => {
	const el = document.createElement('div');
	el.classList.add('node');
	el.style.width = `${tpyramid.bounds.width()}px`;
	el.style.height = `${tpyramid.bounds.height()}px`;
	el.style.left = `${tpyramid.bounds.corners[0]}px`;
	el.style.top = `${tpyramid.bounds.corners[2]}px`;
	el.dataset.index = tpyramid.index;
	return el;
}

const PointEl = (node: HTMLElement, point: Point): HTMLElement => {
	const el = document.createElement('div');
	el.classList.add('point');
	el.style.left = `${point[0] - 2}px`;
	el.style.top = `${point[1] - 2}px`;
	return el;
}

export {
	NodeEl,
	PointEl,
}
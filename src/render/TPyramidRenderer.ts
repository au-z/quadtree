import TPyramid from "src/TPyramid";
import { NodeEl, PointEl } from './Elements';
type Point = [number, number];

export const REDRAW_EVENT: string = "tpyramidrender.redraw.index";
export function emitRedraw(tree: TPyramid) {

  function parentIndex(index: string) {
    return index.replace(/(.?\d)$/ig, '');
  }

  const event = new CustomEvent(REDRAW_EVENT, {
    detail: {
      index: tree.index,
      parent: parentIndex(tree.index),
      tree,
    },
  });
  document.body.dispatchEvent(event);
}

export default class TPyramidRenderer {
  public rootEl: HTMLElement;
  private tree: TPyramid;

  constructor(selector: string = "quadtree", tree: TPyramid) {
    this.tree = tree;
    this.rootEl = this.registerRootElement(selector, tree);
    this.drawTree(this.rootEl, this.tree);
    // TODO
    document.body.addEventListener(REDRAW_EVENT, (e: CustomEvent) => {
      const parentEl = this.findIndexedDomNode(e.detail.parent);
      const el = this.findIndexedDomNode(e.detail.index);

      if (el && e.detail.tree) {
        this.eraseChildren(el);
        parentEl.removeChild(el);
        this.drawTree(parentEl, e.detail.tree);
      }
    });
  }

  private findIndexedDomNode(index: string): HTMLElement {
    if (index === '') return this.rootEl
    return document.querySelector(`div[data-index="${index}"]`)
  }

  private registerRootElement(selector: string, tree: TPyramid): HTMLElement {
    const el: HTMLElement = document.querySelector(selector);
    if (!el) throw new Error("Cannot find root element");
    el.classList.add("quadtree");
    el.style.width = `${this.tree.bounds.width()}px`;
    el.style.height = `${this.tree.bounds.height()}px`;
    return el;
  }

  private eraseChildren(el: HTMLElement) {
    while (el.lastChild) el.removeChild(el.lastChild);
  }

  private drawTree(el: HTMLElement, tree: TPyramid) {
    const node = NodeEl(tree);
    el.appendChild(node);

    if (tree.children.length > 0) {
      tree.children.forEach((c) => this.drawTree(node, c));
    } else {
      tree.points.forEach((p) => node.appendChild(PointEl(node, p)));
    }
  }
}

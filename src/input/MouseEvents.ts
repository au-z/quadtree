class MouseEventBindings {
	public mouseup?: Function
}

export default class MouseEvents {
	private el: HTMLElement

	constructor(el: HTMLElement, bindings: MouseEventBindings) {
		this.el = el
		bindings.mouseup && this.onMouseUp(bindings.mouseup)
	}

	private onMouseUp(cb: Function) {
		this.el.addEventListener('mouseup', (e) => {
			e.stopPropagation()
			const x = e.clientX - this.el.offsetLeft
			const y = e.clientY - this.el.offsetTop
			cb([x, y])
		})
	}

}
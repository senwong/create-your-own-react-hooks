import Reconciler, { HostConfig } from "react-reconciler";
import React, { useState } from "react";

const hostConfig = {
	supportsMutation: true, // it works by mutating nodes
	createInstance(type, props) {
		const node = document.createElement(type);
		if (props.onClick) {
			node.addEventListener("click", props.onClick);
		}
		return node;
	},

	appendInitialChild(parent, child) {
		parent.appendChild(child);
	},

	appendChildToContainer(container, child) {
		container.appendChild(child);
	},

	createTextInstance(text) {
		return document.createTextNode(text);
	},

	prepareUpdate(instance, type, oldProps, newProps) {
		return null;
	},

	commitTextUpdate(textInstance, oldTex, newText) {
		console.trace();
		textInstance.textContent = newText;
	},
	commitUpdate(
		instance,
		updatePayload,
		type,
		oldProps,
		newProps,
		internalInstanceHandle,
	) {
	},

	removeChildFromContainer(container, child) {
		container.removeChild(child);
	},

	commitMount() {},

	getRootHostContext(rootContainerInstance) {
		return {};
	},

	getChildHostContext(parentHostContext, type, rootContainerInstance) {
		return { type };
	},

	shouldSetTextContent(type, props) {
		return false;
	},
	prepareForCommit() {},

	resetAfterCommit() {},

	finalizeInitialChildren() {},
};

const MyRenderer = Reconciler(hostConfig);

const OwnRender = {
	render(reactElement, domNode: HTMLElement) {
		const container = MyRenderer.createContainer(domNode, false, false);
		MyRenderer.updateContainer(reactElement, container, null, null);
	},
};

export default function App() {
	const [count, setCount] = useState(0);
	const [count2, setCount2] = useState(0);

	return (
		<div>
			<h1>count: {count}</h1>
			<div>
				<button onClick={() => setCount((c) => c + 1)}>add</button>
			</div>
			<h1>count2: {count2}</h1>
			<div>
				<button onClick={() => setCount2((c) => c + 1)}>add</button>
			</div>
		</div>
	);
}

OwnRender.render(<App />, document.querySelector("#root3"));

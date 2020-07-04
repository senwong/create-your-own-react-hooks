import React, { ReactElement } from "react";
import './test';

function useState(initStae?: any) {
	// let _domNode;
	const { stateList, setStateList, index, isUpdate, } = currentElement;
	if (!isUpdate) {
		stateList[index] = initStae;
		let currIndex = index;
		setStateList[index] = (arg) => {
			const oldState = stateList[currIndex];
			const newState = typeof arg === "function" ? arg(oldState) : arg;
			stateList[currIndex] = newState;
			//   _domNode.render();
			currentElement.update();
		};
	}

	const ret = [stateList[index], setStateList[index]];
	currentElement.index++;
	return ret;
}

export default function App() {
	const [count, setCount] = useState(0);
	const [count2, setCount2] = useState(0);

	return (
		<>
			<h1>count: {count}</h1>
			<div>
				<button onClick={() => setCount((c) => c + 1)}>add</button>
			</div>
			<h1>count2: {count2}</h1>
			<div>
				<button onClick={() => setCount2((c) => c + 1)}>add</button>
			</div>
		</>
	);
}

let currentElement;

function renderReactElement(
	ele: number | string | ReactElement<{ children: any }>,
	parentNode: Node
): null | Node | Node[] {
	if (ele === undefined || ele === null || typeof ele === "boolean") {
		return;
	}

	if (typeof ele === "string") {
		parentNode.appendChild(document.createTextNode(ele));
		return;
	}

	if (typeof ele === "number") {
		parentNode.appendChild(document.createTextNode(ele.toString()));
		return;
	}

	if (!React.isValidElement(ele)) return;

	if (typeof ele.type === "function") {
		const render = ele.type as (props: any) => React.ReactElement;

		currentElement = {
			reactElement: ele,
			isUpdate: false,
			stateList: [],
			isUpdatRender: [],
			index: 0,
			setStateList: [],
		};

		const returnedDlement = render(ele.props);
		currentElement.isUpdate = true;
		currentElement.update = () => {
			currentElement.index = 0;
			// 怎么卸载掉之前的node
			console.log('ele: ', ele);
			renderReactElement(render(ele.props), parentNode);	
		};
		

		renderReactElement(returnedDlement, parentNode);
		return;
	}
	// create html element

	let node: Node | null = null;
	if (ele.type.toString() !== "Symbol(react.fragment)") {
		node = document.createElement(ele.type);
		if (ele.props.onClick) {
			node.addEventListener("click", (event) => {
				ele.props.onClick(event);
			});
		}
	}

	if (ele.props.children) {
		if (Array.isArray(ele.props.children)) {
			ele.props.children.forEach((child) => {
				renderReactElement(child, node || parentNode);
			});
		} else {
			renderReactElement(ele.props.children, node || parentNode);
		}
	}

	if (node) {
		parentNode.appendChild(node);
	}
}

function ReactDomRender(
	reactElement: ReactElement<{ children: any }>,
	domNode: Node
) {
	while (domNode.firstChild) {
		domNode.removeChild(domNode.firstChild);
	}
	renderReactElement(reactElement, domNode);
}

ReactDomRender(<App />, document.querySelector("#root2"));


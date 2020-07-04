import React, { useState, ReactElement } from "react";
import ReactDOM from "react-dom";


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

ReactDOM.render(<App /> , document.querySelector('#root'));



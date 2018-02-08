import React, { Component } from "react"
import { calculate } from "./API"
import "./App.css"

class App extends Component {
	componentDidMount() {
		calculate()
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Finimize dev challenge</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		)
	}
}

export default App

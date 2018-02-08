import React, { Component } from "react"
import { calculate } from "./API"
import "./App.css"

class App extends Component {
	state = {
		result: null
	}

	componentDidMount() {
		return calculate(1000, 1)
			.then(r => this.setState({result: r.data.result}))
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Finimize dev challenge</h1>
				</header>
				<p className="App-intro">
                    Result: {this.state.result}
				</p>
			</div>
		)
	}
}

export default App

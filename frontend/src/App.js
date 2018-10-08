import React, { Component } from "react"
import { calculate } from "./API"
import InputGraphSection from './Components/InputGraphSection'
import "./App.css"

class App extends Component {
	state = {
		loading: true,
		result: null
	}

	componentDidMount() {
		calculate(1000, 1)
			.then(r => this.setState({
            	loading: false,
                result: r.data.result
			}))
	}

	render() {
	    const {loading, result} = this.state

		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Finimize dev challenge</h1>
					<ul><li><a style={{color:"white"}} href="/coverage/interest_calculator_views_py.html">Coverage</a></li></ul>
				</header>
                    {loading ?
                        'Loading...'
                    :
					 	<InputGraphSection {...{result}}/>
                    }
			</div>
		)
	}
}

export default App

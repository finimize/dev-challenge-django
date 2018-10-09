import React, { Component } from "react"
import { calculate } from "./API"
import { debounce } from "./utils"
import InputGraphSection from './Components/InputGraphSection'
import "./App.css"

class App extends Component {
    initialValues = {
        initialDeposit: 1000,
        monthlyDeposit: 20,
        interestRate: 0.01,
        payoutFrequencyPerYear: 1,
        investPeriodYears: 50
    }
    state = {
        loading: true,
        result: null,
        ...this.initialValues
    }

    fetchData = debounce(async () => {
        const res = await calculate(this.state)
        const result = []
        res.data.data.map((amount, month) => result.push({month, amount}))
        this.setState({
            loading: false,
            result
        })
    }, 150)

    async componentDidMount () {
        await this.fetchData(this.state)
    }

    onChange = async (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value}, this.fetchData)
    }

    render() {
        const {loading, result} = this.state

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Finimize dev challenge</h1>
                    <div><a className="cta-button" href="/coverage"><span aria-label="fire" role="img">💯</span> Checkout the Coverage</a></div>
                </header>
                    {loading ?
                        'Loading...'
                    :
                        <InputGraphSection initialValues={this.initialValues} onChange={this.onChange} {...{result}}/>
                    }
            </div>
        )
    }
}

export default App

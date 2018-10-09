import React, { Component } from "react"
import CurrencyInput from "./CurrencyInput"
import SliderInput from "./SliderInput"
import DisplayGraph from "./DisplayGraph"
import "./InputGraphSection.css"

export default class InputGraphSection extends Component {
  onChange = (event) => {
    let {name, value} = event.target
    if (name === 'interestRate') {
      value = parseFloat(value) / 100
      return this.props.onChange({target: {name, value}})
    }
    this.props.onChange(event)
  }

  render() {
    const { result, initialValues } = this.props
    const { initialDeposit, monthlyDeposit, interestRate, payoutFrequencyPerYear } = initialValues

    return (
      <div>
        <div className="financial-inputs">
          <p className="input-label">How much have you saved?</p>
          <CurrencyInput name="initialDeposit" onChange={this.onChange} defaultValue={initialDeposit} />

          <p className="input-label">How much will you save each month?</p>
          <CurrencyInput name="monthlyDeposit" onChange={this.onChange} defaultValue={monthlyDeposit} />

          <p className="input-label">
            How much interest will you earn per year?
          </p>
          <SliderInput name="interestRate" onChange={this.onChange} defaultValue={interestRate} />

          <p className="input-label">
            When will interest be paid out?
          </p>
          <select defaultValue={payoutFrequencyPerYear} name="payoutFrequencyPerYear" onChange={this.onChange}>
            <option value="12">Monthly</option>
            <option value="4">Quarterly</option>
            <option value="1">Yearly</option>
          </select>?
        </div>
        <div className="financial-display">
          {/*We have included some sample data here, you will need to replace this
            with your own. Feel free to change the data structure if you wish.*/}
          <DisplayGraph
            data={result}
          />
        </div>
      </div>
    )
  }
}

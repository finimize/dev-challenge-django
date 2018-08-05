import React, { Component } from "react"
import CurrencyInput from "./CurrencyInput"
import SliderInput from "./SliderInput"
import RadioInput from "./RadioInput"
import DisplayGraph from "./DisplayGraph"
import "./InputGraphSection.css"

export default class InputGraphSection extends Component {
  render() {
    const {
      interestRateChanged,
      monthlyDepositChanged,
      result,
      savingsAmountChanged,
      freqInterestChanged
    } = this.props

    return (
      <div>
        <div className="financial-inputs">
          <p className="input-label">How much have you saved?</p>
          <CurrencyInput onChange={savingsAmountChanged} defaultValue={0} />

          <p className="input-label">How much will you save each month?</p>
          <CurrencyInput onChange={monthlyDepositChanged} defaultValue={0} />

          <p className="input-label">
            How often will you earn interest?
          </p>
          <RadioInput onChange={freqInterestChanged} defaultValue="yearly"/>

          <p className="input-label">
            How much interest will you earn during this time?
          </p>
          <SliderInput onChange={interestRateChanged} defaultValue={4} />
        </div>
        <div className="financial-display">
          <DisplayGraph data={result} />
        </div>
      </div>
    )
  }
}

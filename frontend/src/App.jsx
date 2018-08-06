import React, { Component } from 'react';
import calculate from './API';
import InputGraphSection from './Components/InputGraphSection';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: null,
      interestRate: 4.0,
      monthlyDeposit: 0.0,
      savingsAmount: 0.0,
      freqInterest: 'yearly',
    };
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const {
      interestRate,
      monthlyDeposit,
      savingsAmount,
      freqInterest,
    } = this.state;

    calculate(savingsAmount, interestRate, monthlyDeposit, freqInterest)
      .then(r => this.setState({
        loading: false,
        result: r.data.result,
      }));
  }

  interestRateChanged(interestRate) {
    this.setState({ interestRate }, this.update);
  }

  savingsAmountChanged(savingsAmount) {
    this.setState({ savingsAmount }, this.update);
  }

  monthlyDepositChanged(monthlyDeposit) {
    this.setState({ monthlyDeposit }, this.update);
  }

  freqInterestChanged(freqInterest) {
    this.setState({ freqInterest }, this.update);
  }

  render() {
    const { loading, result } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Finimize dev challenge
          </h1>
        </header>
        {loading
          ? 'Loading...'
          : (
            <InputGraphSection
              interestRateChanged={v => this.interestRateChanged(v)}
              savingsAmountChanged={v => this.savingsAmountChanged(v)}
              monthlyDepositChanged={v => this.monthlyDepositChanged(v)}
              freqInterestChanged={v => this.freqInterestChanged(v)}
              {...{ result }}
            />)
        }
      </div>
    );
  }
}

export default App;

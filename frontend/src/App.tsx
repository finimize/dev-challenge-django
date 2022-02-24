import React, { useState, useEffect } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import axios from 'axios';

const defaultTheme = extendTheme(theme)

function App() {
  const [principalDeposit, setPrincipalDeposit] = useState(0)
  const [monthlyDeposit, setMonthlyDeposit] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [result, setResult] = useState(0);

  const installments = 50;
  const getValues = Array.from({length: installments}, (v,i) => principalDeposit);

  const graphData = {
    xAxis: Array.from({length: installments}, (v,i) => i+1),
    yAxis: getValues,
  }

  const handlePrincipalDeposit = ({ target }: { target: any }) => setPrincipalDeposit(target.value);
  const handleMonthlyDeposit = ({ target }: { target: any }) => setMonthlyDeposit(target.value);
  const handleInterestRate = ({ target }: { target: any }) => setInterestRate(target.value/100);
  
  useEffect(() => {
    const interestRateOverMonth = interestRate / 12 ;
    const compoundInterest = (Math.pow(1 + interestRateOverMonth, installments));
    const principalInterest = principalDeposit * (compoundInterest);
    const futureContributions = monthlyDeposit * ( (compoundInterest - 1) / (interestRateOverMonth) )

    const result = principalInterest + futureContributions;
    setResult(result);

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios({url: "/interest_data", baseURL: "http://localhost:8000", data: {}, method: 'POST' })
        .then( (resp) => {
            console.log('PESICKA, resp', resp);
        })
  }, [principalDeposit, monthlyDeposit, interestRate] );

  return (
    <ChakraProvider theme={defaultTheme}>
      <DefaultLayout>
        <Container pt={6}>
          <LineChart
            title="Savings Over time"
            xAxisData={graphData.xAxis}
            yAxisData={getValues}
            xLabel="Years"
            yLabel="Amount"
          />
        </Container>
        <Container p={4}>
          <form>
            <label>Initial Deposit: {principalDeposit}</label>
            <br></br>
            <input
              className="input"
              value={principalDeposit}
              name="principalDeposit"
              onChange={handlePrincipalDeposit}
            />
            <br></br>
            <label>Monthly Deposit: {monthlyDeposit}</label>
            <br></br>
            <input
              className="input"
              value={monthlyDeposit}
              name="monthlyDeposit"
              onChange={handleMonthlyDeposit}
            />
            <br></br>
            <label>Interest Rate: {interestRate} ({interestRate*100}%)</label>
            <br></br>
            <input
              className="input"
              value={interestRate}
              name="interestRate"
              onChange={handleInterestRate}
            />
            <br></br>
          </form>

          <div>
              Result:
              <span>{result.toFixed(2)}</span>
          </div>
        </Container>
      </DefaultLayout>
    </ChakraProvider>
  )
}

export default App

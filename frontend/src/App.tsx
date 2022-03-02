import React, { useState, useEffect } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import axios from 'axios';

const defaultTheme = extendTheme(theme)
const baseURL = "http://localhost:8000"
const installments = 50;

function App() {
  const [principalDeposit, setPrincipalDeposit] = useState(0);
  const [monthlyDeposit, setMonthlyDeposit] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  
  const [interestInstallments, setInterestInstallments] = useState([]);
  const [result, setResult] = useState(0);

  const graphData = {
    xAxis: Array.from({length: installments}, (v,i) => i),
    yAxis: interestInstallments,
  }

  const handlePrincipalDeposit = ({ target }: { target: any }) => setPrincipalDeposit(target.value);
  const handleMonthlyDeposit = ({ target }: { target: any }) => setMonthlyDeposit(target.value);
  const handleInterestRate = ({ target }: { target: any }) => {
      var value = target.value;
      value = value/100;
      setInterestRate(value.toFixed(2));
  };
  
  useEffect(() => {
    if (principalDeposit !== 0 && interestRate !== 0) {
        const data = {
            interestRate: interestRate,
            principalDeposit: principalDeposit,
            monthlyDeposit: monthlyDeposit,
            installments: installments,
        }
    
        axios({url: "/interest-data/", baseURL: baseURL, data: data, method: 'POST' })
            .then( (resp) => {
                const interestData = resp.data['interest_over_installment'];
                setInterestInstallments(interestData);
                const lastResult = interestData.pop();
                setResult(lastResult)
            });
    }
    
  }, [principalDeposit, monthlyDeposit, interestRate] );

  return (
    <ChakraProvider theme={defaultTheme}>
      <DefaultLayout>
        <Container pt={6}>
          <LineChart
            title="Savings Over time"
            xAxisData={graphData.xAxis}
            yAxisData={interestInstallments}
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
              value={interestRate*100}
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

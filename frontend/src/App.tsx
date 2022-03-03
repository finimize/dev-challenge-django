import React, { useState, useEffect } from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import axios from 'axios'
import { Input } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'

const defaultTheme = extendTheme(theme)
const baseURL = "http://localhost:8000"
const installments = 50;

function App() {
  const [principalDeposit, setPrincipalDeposit] = useState(0 as number);
  const [monthlyDeposit, setMonthlyDeposit] = useState(100.00 as number);
  const [interestRate, setInterestRate] = useState(0 as number);
  
  const [interestInstallments, setInterestInstallments] = useState([]);

  const graphData = {
    xAxis: Array.from({length: installments+1}, (v,i) => i),
    yAxis: interestInstallments,
  }

  const handlePrincipalDeposit = ({ target }: { target: any }) => setPrincipalDeposit(target.value);
  const handleMonthlyDeposit = ({ target }: { target: any }) => setMonthlyDeposit(target.value);
  const handleInterestRate = ({ target }: { target: any }) => {
      var value = target.value;
      value = (value/100).toFixed(2);
      setInterestRate(value as number);
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
            <FormControl maxW={60}>
                <FormLabel as='legend'>Initial Deposit: {principalDeposit}</FormLabel>
                <Input
                className="input"
                value={principalDeposit}
                name="principalDeposit"
                onChange={handlePrincipalDeposit}
                />
            </FormControl>
            <br/>
            <FormControl maxW={60}>
                <FormLabel as='legend'>Monthly Deposit: {monthlyDeposit}</FormLabel>
                <Input
                    className="input"
                    value={monthlyDeposit}
                    name="monthlyDeposit"
                    onChange={handleMonthlyDeposit}
                />
            </FormControl>
            <br/>
            <FormControl maxW={60}>
                <FormLabel as='legend'>Interest Rate: {interestRate} ({(interestRate*100).toFixed(2)}%)</FormLabel>
                <Input
                    className="input"
                    value={Math.round(interestRate*100)}
                    name="interestRate"
                    onChange={handleInterestRate}
                />
            </FormControl>
        </Container>
      </DefaultLayout>
    </ChakraProvider>
  )
}

export default App

import request from 'axios';

const calculate = (savingsAmount, interestRate, monthlyDeposit, freqInterest) => request
  .post('/calculate/', {
    savingsAmount,
    interestRate,
    monthlyDeposit,
    freqInterest,
  });

export default calculate;

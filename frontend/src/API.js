import request from "axios"

export const calculate = (savingsAmount, interestRate, monthlyDeposit, freqInterest) => {
  return request
    .post("/calculate/", {
      savingsAmount,
      interestRate,
      monthlyDeposit,
      freqInterest
    })
}

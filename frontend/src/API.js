import request from "axios"

export const calculate = ({initialDeposit, monthlyDeposit, interestRate, payoutFrequencyPerYear,
investPeriodYears}) => {
	return request
		.post("/calculate/", {
			initialDeposit: initialDeposit || 0,
			monthlyDeposit: monthlyDeposit || 0,
			interestRate: interestRate || 0,
			payoutFrequencyPerYear: payoutFrequencyPerYear || 12,
			investPeriodYears: investPeriodYears || 50
		})
}

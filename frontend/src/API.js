import request from "axios"

export const calculate = (savingsAmount, interestRate) => {
	return request
		.post("/calculate/", {
			savingsAmount,
			interestRate
		})
}

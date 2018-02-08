import request from "axios"

export const calculate = () => {
	return request
		.post("/calculate/", {
			sap: 1337
		})
		.then(res => {
			console.log(`👨‍🌾 => `, res)
		})
}

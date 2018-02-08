# Finimize dev challenge

## Part 1

1.
Create an API POST endpoint that takes 2 input values:

* `savings_amount`
* `interest_rate`

The API should calculate the value achieved after 12 months of saving when interested is payed monthly.
Bonus points: Use TDD

2.
Create a react app that has a form with 2 input fields:

* `savingsAmount`
* `interestRate`

upon submit, then form should call the API and display the result.

3.
Extend the API to take another input field:

* `interest_payout_frequency`

which concerns how often interest will be payed. Either ‘monthly', ‘quarterly' or ‘annually’. Remember to add proper input validation

4.
On the front-end, extend the form to take the above value as input, and update the API client.

## Part 2

5.
Let the API endpoint also recieve the following input:
`salary`
Add this value to the calc

6.
Extend the front-end to take the `salary` field.

7.
Let the API calculate what the total amount becomes after 50 years

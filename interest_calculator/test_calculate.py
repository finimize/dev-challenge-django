import unittest
from .views import calculate_helper, calculate
from django.test import Client, TestCase
import json
import pdb

class TestServer(TestCase):
    def test_response_from_server(self):
        request = {
            'savingsAmount': 0,
            'interestRate': 0,
            'monthlyDeposit': 0,
            'freqInterest': 'yearly'
        }

        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        json_response = json.loads(response.content)
        months = json_response['result']
        self.assertEquals(months[0], { 'month' : 1, 'amount': 0 })

    def test_response_from_server_when_params_not_provided(self):
        request = { }

        response = self.client.post('/calculate/', json.dumps(request), content_type="application/json")
        self.assertEqual(response.status_code, 400)

class TestCalculate(unittest.TestCase):
    def test_returns_data_for_50_years(self):
        months = calculate_helper(0, 0, 0, 'monthly')
        self.assertEquals(len(months), 600) # 600 = 50 years in months

    def test_when_interest_and_deposit_is_zero(self):
        months = calculate_helper(100, 0, 0, 'monthly')

        for m in months:
            amount = m["amount"]
            self.assertEquals(amount, 100)

    # assuming monthly deposits are made from the first month
    def test_when_interest_is_zero_and_deposit_is_not_zero(self):
        months = calculate_helper(100, 10, 0, 'monthly')
        sample = months[:5]
        expected = [{
            'month': 1,
            'amount': 110,
        }, {
            'month': 2,
            'amount': 120,
        }, {
            'month': 3,
            'amount': 130,
        }, {
            'month': 4,
            'amount': 140,
        }, {
            'month': 5,
            'amount': 150,
        }]
        self.assertEquals(sample, expected)

    def test_when_interest_is_not_zero_and_deposit_is_zero(self):
        months = calculate_helper(100, 0, 10, 'monthly')
        sample = months[:5]
        expected = [{
            'month': 1,
            'amount': 110.00,
        }, {
            'month': 2,
            'amount': 121.00,
        }, {
            'month': 3,
            'amount': 133.10,
        }, {
            'month': 4,
            'amount': 146.41,
        }, {
            'month': 5,
            'amount': 161.05,
        }]

        self.assertEquals(sample, expected)

    def test_when_interest_and_deposit_is_not_zero(self):
        months = calculate_helper(100, 10, 10, 'monthly')
        sample = months[:5]
        expected = [{
            'month': 1,
            'amount': 121.00,
        }, {
            'month': 2,
            'amount': 144.10,
        }, {
            'month': 3,
            'amount': 169.51,
        }, {
            'month': 4,
            'amount': 197.46,
        }, {
            'month': 5,
            'amount': 228.21,
        }]

        self.assertEquals(sample, expected)

    def test_when_interest_earned_per_annum(self):
        months = calculate_helper(100, 0, 10, 'yearly')
        self.assertEquals(months[0], {'month': 1, 'amount': 100})
        self.assertEquals(months[11], {'month': 12, 'amount': 110})

    def test_when_interest_earned_per_quarter(self):
        months = calculate_helper(100, 0, 10, 'quarterly')
        self.assertEquals(months[0], {'month': 1, 'amount': 100})
        self.assertEquals(months[2], {'month': 3, 'amount': 110})

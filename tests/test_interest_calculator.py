import json
import math

from django.test import SimpleTestCase, Client

class InterestCalculatorTests(SimpleTestCase):
    def setUp(self):
        self.client = Client()
        self.data = {
            "initialDeposit": 1000,
            "monthlyDeposit": 0,
            "interestRate": 0.01,
            "payoutFrequencyPerYear": 12,
            "investPeriodYears": 1
        }

    def calc(self, data):
        res = self.client.post('/calculate/', json.dumps(data), "application/json")
        if res.status_code == 200:
            return json.loads(res.content)
        return res

    def test_negative_values(self):
        for key, val in self.data.items():
            self.data[key] = -1
            res = self.calc(self.data)
            self.assertEqual(res.status_code, 400)

    def test_bad_json(self):
        res = self.client.post('/calculate/', ";", "application/json")
        self.assertEqual(res.status_code, 400)

    def test_no_interest(self):
        for key, val in self.data.items():
            self.data[key] = -1
            res = self.calc(self.data)
            self.assertEqual(res.status_code, 400)

    def test_number_of_data_points(self):
        self.data['investPeriodYears'] = 50
        res = self.calc(self.data)
        # +1 for initial data point
        months_in_50_years = (50 * 12) + 1
        self.assertEqual(len(res['data']), months_in_50_years)

    def test_0_savings(self):
        self.data['initialDeposit'] = 0
        self.data['monthlyDeposit'] = 0
        res = self.calc(self.data)
        for x in res['data']:
            self.assertEqual(x, 0)

    def test_fixture_values(self):
        expected = [
            1000.00,
            1000.83,
            1001.66,
            1002.49,
            1003.33,
            1004.17,
            1005.01,
            1005.85,
            1006.69,
            1007.53,
            1008.37,
            1009.21,
            1010.05
        ]

        res = self.calc(self.data)
        data = res['data']
        self.assertEqual(data, expected)

    def test_3000th_value(self):
        self.data['investPeriodYears'] = 300
        a1 = self.data['initialDeposit']
        r = (self.data['interestRate'] / self.data['payoutFrequencyPerYear']) + 1

        # https://en.wikipedia.org/wiki/Geometric_series#Common_ratio
        nth_term = lambda n, a1, r: a1 * pow(r, n - 1)

        res = self.calc(self.data)
        data = res['data']
        n = 2
        self.assertTrue(math.isclose(data[n-1], nth_term(n, a1, r), rel_tol=0.01))
        n = 3000
        self.assertTrue(math.isclose(data[n-1], nth_term(n, a1, r), rel_tol=0.01))

    def test_monthly_deposit(self):
        expected = [
            1000.00,
            1100.92,
            1201.92,
            1303.00
        ]
        self.data['investPeriodYears'] = 1
        self.data['monthlyDeposit'] = 100
        res = self.calc(self.data)
        data = res['data'][:4]
        self.assertEqual(data, expected)

    def test_quarterly_pay_out(self):
        expected = [
            1000.00,
            1002.5, 1002.5, 1002.5,
            1005.01, 1005.01, 1005.01,
            1007.52, 1007.52, 1007.52,
            1010.04, 1010.04, 1010.04
        ]
        self.data['payoutFrequencyPerYear'] = 4
        res = self.calc(self.data)
        data = res['data']
        self.assertEqual(data, expected)

    def test_yearly_pay_out(self):
        expected = [1000.00]
        expected.extend([1010.00 for x in range(12)])
        self.data['payoutFrequencyPerYear'] = 1
        res = self.calc(self.data)
        data = res['data']
        self.assertEqual(data, expected)

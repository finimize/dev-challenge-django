import json
# import mock

from django.test import SimpleTestCase, Client
# from django.conf import settings

class InterestCalculatorTests(SimpleTestCase):
    def setUp(self):
        self.client = Client()
        self.data = {
            "initialDeposit": 23,
            "monthlyDeposit": 23,
            "interestRate": 12.3,
            "payoutFrequencyInMonths": 2
        }

    def calc(self, data):
        res = self.client.post('/calculate/', json.dumps(data), "application/json")
        if res.status_code == 200:
            return json.loads(res.content)
        return res

    def test_number_of_data_points(self):
        res = self.calc(self.data)
        # TODO: leap years!
        months_in_50_years = 50 * 12
        self.assertEqual(len(res['data']), months_in_50_years)

    def test_0_savings(self):
        self.data['initialDeposit'] = 0
        self.data['monthlyDeposit'] = 0
        res = self.calc(self.data)
        for x in res['data']:
            self.assertEqual(x, 0)

    # def test_0_monthly_deposit(self):
    #     pass

    # def test_0_interest_rate(self):
    #     pass


    # def test_number_of_data_points(self):
    #     pass

    # def test_example_values(self):
    #     pass

    # def test_monthly_pay_out(self):
    #     pass

    # def test_yearly_pay_out(self):
    #     pass

    # def test_quarterly_pay_out(self):
    #     pass

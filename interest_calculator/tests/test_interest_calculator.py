import json
# import mock

from django.test import SimpleTestCase, Client
# from django.conf import settings

class InterestCalculatorTests(SimpleTestCase):
    def setUp(self):
        self.client = Client()

    def test_0_savings(self):
        data = {
            "savingsAmount": 0
        }
        res = self.client.post('/calculate/', json.dumps(data), "application/json")
        print('res', res.content)

    # def test_0_interest_rate(self):
    #     pass

    # def test_0_monthly_deposit(self):
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

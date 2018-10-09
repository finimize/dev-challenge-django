from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
import json
from .interest_calculator_service import calculate_life_time_savings

def bad_request(message):
    return HttpResponseBadRequest('{"error": "%s"}' % message)

@require_POST
@csrf_exempt
def calculate(request):
    try:
        params = json.loads(request.body)
    except ValueError as e:
        return bad_request("JSONDecodeError")

    initial_deposit = float(params.get('initialDeposit', 0))
    monthly_deposit = float(params.get('monthlyDeposit', 0))
    interest_rate = float(params.get('interestRate', 0))
    payout_frequency_per_year = int(params.get('payoutFrequencyPerYear', None))
    invest_period_in_years = int(params.get('investPeriodYears', None))
    total_months = invest_period_in_years * 12

    fields = [initial_deposit, monthly_deposit, interest_rate, payout_frequency_per_year, invest_period_in_years]
    all_fields_positive = all(val >= 0 for val in fields)
    if not all_fields_positive:
        return bad_request('All fields must be positive')

    out = calculate_life_time_savings(initial_deposit, monthly_deposit, interest_rate, payout_frequency_per_year, invest_period_in_years, total_months)

    return JsonResponse({'data': out})



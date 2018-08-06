from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

NUM_MONTHS = 50 * 12
FREQ_IN_MONTHS = {
    'monthly': 1,
    'quarterly': 3,
    'yearly': 12
}

@require_POST
@csrf_exempt
def calculate(request):
    params = json.loads(request.body)
    savings_amount = params.get('savingsAmount', None)
    interest_rate = params.get('interestRate', None)
    monthly_deposit = params.get('monthlyDeposit', None)
    freq_interest = params.get('freqInterest', None)

    if not_valid(savings_amount) or not_valid(interest_rate) or not_valid(monthly_deposit) or not_valid(freq_interest):
        return HttpResponseBadRequest('Required parameters are not provided')

    months = calculate_helper(savings_amount, monthly_deposit, interest_rate, freq_interest)
    return JsonResponse({'result': months})

def not_valid(param):
    return param is None

def calculate_helper(savings_amount, monthly_deposit, interest_rate, freq_interest):
    months = [None] * NUM_MONTHS
    freq_in_months = FREQ_IN_MONTHS[freq_interest]
    percent_interest = float(interest_rate) / 100

    prev_month_amount = savings_amount
    for m in range(NUM_MONTHS):
        if m > 0:
            prev_month_amount = months[m-1]['amount']
        if (m + 1) % freq_in_months == 0:
            interest = percent_interest
        else:
            interest = 0
        amount = (prev_month_amount + monthly_deposit) * (1 + interest)
        months[m] = {'month': m+1, 'amount': round(amount, 2) }

    return months

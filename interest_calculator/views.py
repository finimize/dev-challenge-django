from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

@require_POST
@csrf_exempt
def calculate(request):
    print('here')
    params = json.loads(request.body)
    print(params)
    initial_deposit = params.get('initialDeposit', None)
    monthly_deposit = params.get('monthlyDeposit', None)
    interest_rate = params.get('interestRate', None)
    payout_frequency_in_months = params.get('payoutFrequencyInMonths', None)

    if initial_deposit is None or interest_rate is None:
        return HttpResponseBadRequest('Required parameters are not provided')

    out = [0 for i in range(50 * 12)]
    return JsonResponse({'data': out})

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json


@require_POST
@csrf_exempt
def interest_data(request):
    # This is needed so I can access the data being passed via axios. Otherwise the data comingin is www form styled.
    data = json.loads(request.body.decode('utf-8'))

    # variables we need to use in our calculation.
    principalDeposit = float(data['principalDeposit'])
    monthlyDeposit = float(data['monthlyDeposit'])
    interestOverMonth = float(data['interestRate'])/12

    # installments = 50 years * frequency of compounding
    installments = data['installments']*12

    # I've decided to limit when we're checking the data to when we have an initial deposit or an interest rate.  
    if interestOverMonth != 0 and  principalDeposit != 0:
        interest_over_installment = []

        #Gives us the principal deposit in our array
        interest_over_installment.append(principalDeposit)
        for installment in range(1, installments + 1):
            compoundInterest = pow(1 + interestOverMonth,installment)
            principalInterest = principalDeposit * compoundInterest
            futureContributions = monthlyDeposit * ((compoundInterest - 1) / (interestOverMonth))            

            result = principalInterest + futureContributions
            
            # Only insert the result for yearly calculations. While the monthly rates are interesting, 
            # for this graph we only want the 50 results that make up our graph year. 
            if installment % 12 == 0:
                interest_over_installment.append(round(result, 2)) 
        return JsonResponse({'interest_over_installment': interest_over_installment})
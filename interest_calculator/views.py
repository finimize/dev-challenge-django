from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

@require_POST
@csrf_exempt
def interest_data(request):
    # Just an example! Should be replaced with real calculated data
    return JsonResponse({'result': 1000})
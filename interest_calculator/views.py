from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

@require_POST
@csrf_exempt
def calculate(request):
    # Just an example
    return JsonResponse({'result': 1000})
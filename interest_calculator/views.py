from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import calculate_helper, CalculateSerializer
import pdb

class CalculateView(APIView):
    def post(self, request):
        serializer = CalculateSerializer(data=request.data)

        if serializer.is_valid():
            result = calculate_helper(
                float(serializer.validated_data['savingsAmount']),
                float(serializer.validated_data['monthlyDeposit']),
                float(serializer.validated_data['interestRate']),
                serializer.validated_data['freqInterest'])

            return Response({'result': result})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

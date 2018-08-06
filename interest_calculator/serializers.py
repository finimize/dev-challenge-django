from rest_framework import serializers

NUM_MONTHS = 50 * 12
FREQ_IN_MONTHS = {
    'monthly': 1,
    'quarterly': 3,
    'yearly': 12
}

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

class CalculateSerializer(serializers.Serializer):
    savingsAmount = serializers.FloatField()
    interestRate = serializers.FloatField()
    monthlyDeposit = serializers.FloatField()
    freqInterest = serializers.CharField()

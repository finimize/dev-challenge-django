def calculate_life_time_savings(initial_deposit, monthly_deposit, interest_rate, payout_frequency_per_year, invest_period_in_years, total_months):
    out = []
    assert payout_frequency_per_year <= 12, "Should not be more than monthly for now"

    current = initial_deposit
    out = [current]
    incremental_interest_rate = (interest_rate / payout_frequency_per_year) + 1
    nth_month = (1 / (payout_frequency_per_year / 12))
    for month in range(total_months):
        current = round(current + monthly_deposit, 2)
        if month % nth_month == 0:
            current = round(current * incremental_interest_rate, 2)
        out.append(current)
    return out

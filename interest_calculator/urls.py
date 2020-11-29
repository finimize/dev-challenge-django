from django.urls import path
from .views import interest_data


urlpatterns = [
    path('interest-data/', interest_data, name="interest_data"),
]

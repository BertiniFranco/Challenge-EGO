from django.urls import path
from .caracteristica_views import CaracteristicaListCreateAPIView, CaracteristicaUpdateDestroyAPIView


urlpatterns = [
    path('', CaracteristicaListCreateAPIView.as_view(), name='caracteristica-list-create'),
    path('<int:pk>', CaracteristicaUpdateDestroyAPIView.as_view(), name='caracteristica-update-destroy')
]

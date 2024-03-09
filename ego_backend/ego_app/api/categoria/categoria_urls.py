from django.urls import path
from .categoria_views import CategoriaListCreateAPIView, CategoriaUpdateDestroyAPIView


urlpatterns = [
    path('', CategoriaListCreateAPIView.as_view(), name='categoria-list-create'),
    path('<int:pk>', CategoriaUpdateDestroyAPIView.as_view(), name='categoria-update-destroy')
]

from django.urls import path
from .modelo_views import ModeloListCreateAPIView, ModeloUpdateDestroyAPIView


urlpatterns = [
    path('', ModeloListCreateAPIView.as_view(), name='modelo-list-create'),
    path('<int:pk>', ModeloUpdateDestroyAPIView.as_view(), name='modelo-update-destroy')
]

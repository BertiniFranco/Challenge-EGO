from django.urls import path
from .marca_views import MarcaListCreateAPIView, MarcaUpdateDestroyAPIView


urlpatterns = [
    path('', MarcaListCreateAPIView.as_view(), name='marca-list-create'),
    path('<int:pk>', MarcaUpdateDestroyAPIView.as_view(), name='marca-update-destroy')
]

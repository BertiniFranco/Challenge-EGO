from django.urls import path
from .auto_views import AutoListCreateAPIView, AutoRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', AutoListCreateAPIView.as_view(), name='auto-list-create'),
    path('<int:pk>', AutoRetrieveUpdateDestroyAPIView.as_view(), name='auto-retrieve-update-destroy')
]

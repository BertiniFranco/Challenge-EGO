from rest_framework.generics import ListCreateAPIView, UpdateAPIView, DestroyAPIView
from ego_app.models import Caracteristica
from .caracteristica_serializers import CaracteristicaSerializer


class CaracteristicaListCreateAPIView(ListCreateAPIView):
    serializer_class = CaracteristicaSerializer
    queryset = Caracteristica.objects.all()


class CaracteristicaUpdateDestroyAPIView(UpdateAPIView, DestroyAPIView):
    serializer_class = CaracteristicaSerializer
    queryset = Caracteristica.objects.all()

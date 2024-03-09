from rest_framework.generics import ListCreateAPIView, UpdateAPIView, DestroyAPIView
from ego_app.models import Marca
from .marca_serializers import MarcaSerializer


class MarcaListCreateAPIView(ListCreateAPIView):
    serializer_class = MarcaSerializer
    queryset = Marca.objects.all()


class MarcaUpdateDestroyAPIView(UpdateAPIView, DestroyAPIView):
    serializer_class = MarcaSerializer
    queryset = Marca.objects.all()

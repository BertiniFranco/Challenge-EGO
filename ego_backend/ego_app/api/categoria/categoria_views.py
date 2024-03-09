from rest_framework.generics import ListCreateAPIView, UpdateAPIView, DestroyAPIView
from ego_app.models import Categoria
from .categoria_serializers import CategoriaSerializer


class CategoriaListCreateAPIView(ListCreateAPIView):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()


class CategoriaUpdateDestroyAPIView(UpdateAPIView, DestroyAPIView):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()

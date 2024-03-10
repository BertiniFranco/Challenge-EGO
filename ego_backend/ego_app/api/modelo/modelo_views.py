from rest_framework.generics import ListCreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import status
from ego_app.models import Modelo
from .modelo_serializers import ModeloListRetrieveSerializer, ModeloCreateUpdateSerializer


class ModeloListCreateAPIView(ListCreateAPIView):
    serializer_class = ModeloListRetrieveSerializer
    queryset = Modelo.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = ModeloCreateUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ModeloUpdateDestroyAPIView(UpdateAPIView, DestroyAPIView):
    serializer_class = ModeloCreateUpdateSerializer
    queryset = Modelo.objects.all()

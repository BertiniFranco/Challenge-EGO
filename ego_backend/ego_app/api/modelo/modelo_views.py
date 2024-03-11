from rest_framework.generics import ListCreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import status
from ego_app.models import Modelo, Auto
from .modelo_serializers import ModeloListRetrieveSerializer, ModeloCreateUpdateSerializer


class ModeloListCreateAPIView(ListCreateAPIView):
    serializer_class = ModeloListRetrieveSerializer
    queryset = Modelo.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = ModeloCreateUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if Modelo.objects.all().filter(modelo=request.data['modelo']).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data='Nombre de modelo ya existente.')
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ModeloUpdateDestroyAPIView(UpdateAPIView, DestroyAPIView):
    serializer_class = ModeloCreateUpdateSerializer
    queryset = Modelo.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if Auto.objects.all().filter(modelo=instance).count() > 0:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data='No se puede eliminar este modelo ya que está asignado en al menos un auto.')
        else:
            self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

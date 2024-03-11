from rest_framework.generics import ListCreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.views import status
from ego_app.models import Caracteristica, Auto
from .caracteristica_serializers import CaracteristicaSerializer


class CaracteristicaListCreateAPIView(ListCreateAPIView):
    serializer_class = CaracteristicaSerializer
    queryset = Caracteristica.objects.all()


class CaracteristicaUpdateDestroyAPIView(UpdateAPIView, DestroyAPIView):
    serializer_class = CaracteristicaSerializer
    queryset = Caracteristica.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if Auto.objects.all().filter(caracteristicas=instance).count() > 0:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data='No se puede eliminar esta característica ya que está asignada en al menos un auto.')
        else:
            self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

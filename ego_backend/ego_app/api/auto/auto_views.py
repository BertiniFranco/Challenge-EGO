from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import status
from ego_app.models import Auto
from .auto_serializers import AutoListRetrieveSerializer, AutoCreateUpdateSerializer


class AutoListCreateAPIView(ListCreateAPIView):
    serializer_class = AutoListRetrieveSerializer
    queryset = Auto.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = AutoCreateUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class AutoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = AutoCreateUpdateSerializer
    queryset = Auto.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = AutoListRetrieveSerializer(instance)
        return Response(serializer.data)

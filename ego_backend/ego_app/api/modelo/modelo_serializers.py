from rest_framework.serializers import ModelSerializer
from ego_app.models import Modelo
from ..categoria.categoria_serializers import CategoriaSerializer


class ModeloListRetrieveSerializer(ModelSerializer):
    categoria = CategoriaSerializer()

    class Meta:
        model = Modelo
        fields = '__all__'


class ModeloCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'

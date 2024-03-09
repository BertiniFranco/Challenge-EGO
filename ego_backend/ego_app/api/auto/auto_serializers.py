from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ego_app.models import Auto, Caracteristica
from ..marca.marca_serializers import MarcaSerializer
from ..categoria.categoria_serializers import CategoriaSerializer
from ..caracteristica.caracteristica_serializers import CaracteristicaSerializer


class AutoListRetrieveSerializer(ModelSerializer):
    marca = MarcaSerializer()
    categoria = CategoriaSerializer()
    caracteristicas = CaracteristicaSerializer(many=True)

    class Meta:
        model = Auto
        fields = '__all__'


class AutoCreateUpdateSerializer(ModelSerializer):
    caracteristicas = PrimaryKeyRelatedField(many=True, queryset=Caracteristica.objects.all())

    class Meta:
        model = Auto
        fields = '__all__'

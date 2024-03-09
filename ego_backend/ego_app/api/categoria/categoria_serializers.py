from rest_framework.serializers import ModelSerializer
from ego_app.models import Categoria


class CategoriaSerializer(ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

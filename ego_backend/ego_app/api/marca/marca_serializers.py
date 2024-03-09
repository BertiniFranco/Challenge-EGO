from rest_framework.serializers import ModelSerializer
from ego_app.models import Marca


class MarcaSerializer(ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

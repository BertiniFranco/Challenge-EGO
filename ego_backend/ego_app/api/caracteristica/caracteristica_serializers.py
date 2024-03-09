from rest_framework.serializers import ModelSerializer
from ego_app.models import Caracteristica


class CaracteristicaSerializer(ModelSerializer):
    class Meta:
        model = Caracteristica
        fields = '__all__'

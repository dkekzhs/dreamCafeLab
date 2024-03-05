from rest_framework import serializers
from .models import Mall

class MallSerializer(serializers.ModelSerializer):
    class Meta :
        model = Mall
        fields = '__all__'

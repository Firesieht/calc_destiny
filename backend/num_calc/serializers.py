from rest_framework import serializers
from .models import Calcul


class CalculSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Calcul"""
    
    class Meta:
        model = Calcul
        fields = ['id', 'login', 'data', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class CalculCreateSerializer(serializers.ModelSerializer):
    """Сериализатор для создания новых расчетов"""
    
    class Meta:
        model = Calcul
        fields = ['login', 'data']
        
    def validate_login(self, value):
        """Валидация поля login"""
        if not value or not value.strip():
            raise serializers.ValidationError("Поле login не может быть пустым")
        return value.strip()
    
    def validate_data(self, value):
        """Валидация поля data"""
        if not value or not value.strip():
            raise serializers.ValidationError("Поле data не может быть пустым")
        return value.strip() 
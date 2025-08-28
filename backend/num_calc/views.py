from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import Http404
from .models import Calcul
from .serializers import CalculSerializer, CalculCreateSerializer


class CalculListCreateView(generics.ListCreateAPIView):
    """API для получения списка всех расчетов и создания нового"""
    queryset = Calcul.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CalculCreateSerializer
        return CalculSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Проверяем, существует ли уже расчет с такими login и data
            login = serializer.validated_data['login']
            data = serializer.validated_data['data']
            
            existing_calcul = Calcul.objects.filter(
                login=login,
                data=data
            ).first()
            
            if existing_calcul:
                # Если объект уже существует, возвращаем его вместо создания нового
                response_serializer = CalculSerializer(existing_calcul)
                return Response({
                    "message": "Расчет с такими данными уже существует",
                    "existing": True,
                    **response_serializer.data
                }, status=status.HTTP_200_OK)
            
            # Создаем новый объект, если дубликата нет
            calcul = serializer.save()
            response_serializer = CalculSerializer(calcul)
            return Response({
                "message": "Расчет успешно создан",
                "existing": False,
                **response_serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalculDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API для получения, обновления и удаления расчета по ID"""
    queryset = Calcul.objects.all()
    serializer_class = CalculSerializer
    lookup_field = 'id'
    
    def get_object(self):
        try:
            return get_object_or_404(Calcul, id=self.kwargs['id'])
        except ValueError:
            raise Http404("Некорректный ID")


@api_view(['GET'])
def get_calculs_by_login(request, login):
    """Получение всех расчетов по логину пользователя"""
    if not login:
        return Response(
            {"error": "Логин не может быть пустым"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    calculs = Calcul.objects.filter(login=login)
    serializer = CalculSerializer(calculs, many=True)
    
    return Response({
        "login": login,
        "count": calculs.count(),
        "calculs": serializer.data
    })


@api_view(['DELETE'])
def delete_calculs_by_login(request, login):
    """Удаление всех расчетов по логину пользователя"""
    if not login:
        return Response(
            {"error": "Логин не может быть пустым"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    calculs = Calcul.objects.filter(login=login)
    count = calculs.count()
    
    if count == 0:
        return Response(
            {"message": f"Расчеты для пользователя '{login}' не найдены"}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    calculs.delete()
    
    return Response({
        "message": f"Удалено {count} расчетов для пользователя '{login}'"
    })


@api_view(['GET'])
def api_status(request):
    """Проверка статуса API"""
    return Response({
        "status": "OK",
        "message": "Calcul API работает корректно",
        "total_calculs": Calcul.objects.count()
    })

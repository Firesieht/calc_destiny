from django.urls import path
from . import views

app_name = 'num_calc'

urlpatterns = [
    # Основные операции CRUD
    path('calculs/', views.CalculListCreateView.as_view(), name='calcul-list-create'),
    path('calculs/<int:id>/', views.CalculDetailView.as_view(), name='calcul-detail'),
    
    # Операции по логину
    path('calculs/by-login/<str:login>/', views.get_calculs_by_login, name='calculs-by-login'),
    path('calculs/delete-by-login/<str:login>/', views.delete_calculs_by_login, name='delete-calculs-by-login'),
    
    # Статус API
    path('status/', views.api_status, name='api-status'),
] 
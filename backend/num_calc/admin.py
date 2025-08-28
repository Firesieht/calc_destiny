from django.contrib import admin
from .models import Calcul


@admin.register(Calcul)
class CalculAdmin(admin.ModelAdmin):
    """Админ-панель для модели Calcul"""
    list_display = ('id', 'login', 'created_at', 'updated_at')
    list_filter = ('login', 'created_at')
    search_fields = ('login', 'data')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('login', 'data')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by('-created_at')

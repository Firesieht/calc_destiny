from django.db import models

# Create your models here.


class Calcul(models.Model):
    """Модель для хранения расчетов пользователей"""
    id = models.AutoField(primary_key=True)
    login = models.CharField(max_length=255, verbose_name="Логин пользователя")
    data = models.TextField(verbose_name="Данные расчета")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")

    class Meta:
        verbose_name = "Расчет"
        verbose_name_plural = "Расчеты"
        ordering = ['-created_at']

    def __str__(self):
        return f"Расчет #{self.id} - {self.login}"

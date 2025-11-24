from django.db import models
from django.core.exceptions import ValidationError

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=15)

    def __str__(self):
        return self.nombre
    
class Empleado(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    cargo = models.CharField(max_length=50, choices=[
        ('Repartidor', 'Repartidor'),
        ('Administrador', 'Administrador'),
        ('Atención al Cliente', 'Atención al Cliente'),
    ])

    def __str__(self):
        return f"{self.nombre} - {self.cargo}"
    

class Pedido(models.Model):
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE, null=True, blank=True, related_name='pedidos')
    empleado = models.ForeignKey('Empleado', on_delete=models.SET_NULL, null=True, blank=True, related_name='pedidos_asignados')

    nombre = models.CharField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    direccion = models.CharField(max_length=150, null=True, blank=True)
    cantidad_bidones = models.IntegerField()
    calle = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(
        max_length=30,
        choices=[
            ('espera', 'En espera'),
            ('camino', 'En camino'),
            ('entregado', 'Entregado')
        ],
        default='espera'
    )

    def clean(self):
        if self.cantidad_bidones <= 0:
            raise ValidationError("La cantidad de bidones debe ser mayor que 0")

    def __str__(self):
        if self.cliente:
            return f"Pedido de {self.cliente.nombre} ({self.estado})"
        elif self.nombre:
            return f"Pedido de {self.nombre} ({self.estado})"
        else:
            return f"Pedido sin nombre ({self.estado})"

from django.contrib import admin
from .models import Cliente, Empleado, Pedido

class ClienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'correo', 'direccion', 'telefono')
    search_fields = ('nombre', 'correo')

admin.site.register(Cliente, ClienteAdmin)

class EmpleadoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'correo', 'cargo')
    search_fields = ('nombre', 'correo', 'cargo')

admin.site.register(Empleado, EmpleadoAdmin)

class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'empleado', 'cantidad_bidones', 'calle', 'estado', 'fecha_creacion')
    list_filter = ('estado', 'fecha_creacion')
    search_fields = ('cliente__nombre', 'empleado__nombre', 'calle')

admin.site.register(Pedido, PedidoAdmin)
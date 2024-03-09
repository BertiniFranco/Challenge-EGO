from django.contrib import admin
from ego_app import models


admin.site.register(models.Marca)
admin.site.register(models.Categoria)
admin.site.register(models.Caracteristica)
admin.site.register(models.Auto)
admin.site.register(models.AutoCaracteristica)

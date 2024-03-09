from django.urls import path, include

urlpatterns = [
    path('auto/', include('ego_app.api.auto.auto_urls')),
    path('caracteristica/', include('ego_app.api.caracteristica.caracteristica_urls')),
    path('categoria/', include('ego_app.api.categoria.categoria_urls')),
    path('marca/', include('ego_app.api.marca.marca_urls'))
]

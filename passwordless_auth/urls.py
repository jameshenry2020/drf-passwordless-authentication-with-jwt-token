from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('drfpasswordless.urls')),
    path('api/auth/', include("accounts.urls"))
]

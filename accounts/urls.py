from django.urls import path
from .views import ObtainAuthTokenFromCallbackToken, GetUserDetail, CreateUserProfile

urlpatterns=[
    path('token/', ObtainAuthTokenFromCallbackToken.as_view()),
    path('users/', GetUserDetail.as_view()),
    path('create-profile', CreateUserProfile.as_view())
]
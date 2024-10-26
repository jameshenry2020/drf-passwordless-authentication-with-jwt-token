from django.shortcuts import get_object_or_404
from rest_framework import response, status, permissions
from drfpasswordless.serializers import CallbackTokenAuthSerializer
from rest_framework.views import APIView
from .serializers import CreateUserprofileSerializer, UserprofileSerializer
from rest_framework.generics import GenericAPIView
from django.utils.module_loading import import_string
from drfpasswordless.settings import api_settings
from .models import UserProfile

# Create your views here.

class AbstractBaseObtainAuthToken(APIView):
    serializer_class = None

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data["user"]
            token_creator = import_string(api_settings.PASSWORDLESS_AUTH_TOKEN_CREATOR)
            tokens = token_creator(user)

            if tokens:  
                return response.Response(tokens, status=status.HTTP_200_OK)
        else:
            
            return response.Response({"detail": "Couldn't log you in. Try again later."}, status=status.HTTP_400_BAD_REQUEST)


class ObtainAuthTokenFromCallbackToken(AbstractBaseObtainAuthToken):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CallbackTokenAuthSerializer


class CreateUserProfile(GenericAPIView):
    permission_classes=[permissions.IsAuthenticated]
    serializer_class=CreateUserprofileSerializer
    def patch(self, request, *args, **kwargs):
        user_profile=UserProfile.objects.get(user=request.user)
        serializer=self.serializer_class(instance=user_profile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_profile.completed=True
            user_profile.save()
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class GetUserDetail(GenericAPIView):
    serializer_class=UserprofileSerializer
    permission_classes=[permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user_profile=get_object_or_404(UserProfile, user=request.user)
        serializer=self.get_serializer(user_profile)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
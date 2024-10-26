from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from phonenumber_field.modelfields import PhoneNumberField
from .managers import CustomUserManager
# Create your models here.

class User(AbstractBaseUser):
    mobile = PhoneNumberField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()
    USERNAME_FIELD = 'mobile'  
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.mobile}"
    

class UserProfile(models.Model):
    user= models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    names = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(max_length=200, blank=True, null=True)
    completed=models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user.id}-profile"



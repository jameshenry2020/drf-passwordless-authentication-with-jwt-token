from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, mobile, password=None, **extra_fields):
        user = self.model( mobile=mobile, **extra_fields)
        user.set_unusable_password()  # No password for passwordless authentication
        user.save(using=self._db)
        return user
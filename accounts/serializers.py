from rest_framework import serializers
from .models import UserProfile

class UserprofileSerializer(serializers.ModelSerializer):
    mobile=serializers.CharField(source="user.mobile")
    class Meta:
        model=UserProfile
        fields=['id', 'email', 'names', "mobile", "completed"]

class CreateUserprofileSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields=['id', 'email', 'names']

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):

        return super().update(instance, validated_data)
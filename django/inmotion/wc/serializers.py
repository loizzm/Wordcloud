from .models import ImageField
from rest_framework import serializers

class ImageSerializer(serializers.ModelSerializer):
    image_url=serializers.SerializerMethodField('get_image_url')
    class Meta:
        model = ImageField
        fields = ('image')
    def get_image_url(self,obj):
        request = self.context.get('request')
        photo_url = obj.image.url
        return request.build_absolute_uri(photo_url)
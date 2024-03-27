from rest_framework import serializers
from .models import Book

# dummy serializer
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publication_date']

class MySerializer(serializers.Serializer):
    test1 = serializers.JSONField()
    # test2 = serializers.JSONField()
    test2 = serializers.IntegerField()
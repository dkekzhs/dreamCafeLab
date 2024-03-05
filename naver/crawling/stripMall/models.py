from django.db import models

# Create your models here.
class Mall(models.Model):
    name = models.CharField(max_length =80)
    price = models.IntegerField();

    def __str__(self):
        return self.name
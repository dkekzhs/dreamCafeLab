from django.apps import AppConfig
from django.conf import settings

class StripmallConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'stripMall'
    def ready(self):
        if settings.SCHEDULER_DEFAULT:
            from . import operator
            